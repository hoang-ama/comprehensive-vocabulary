import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function WordDetailScreen({ route }) {
  const { word } = route.params;
  const soundRef = useRef(null);

  const playSound = async (url) => {
    try {
      if (soundRef.current) await soundRef.current.unloadAsync();
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      soundRef.current = sound;
      await sound.playAsync();
    } catch (err) {
      console.warn('Audio error:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{word.word}</Text>
      <Text style={styles.label}>Phonetics</Text>
      <Text>🇬🇧 {word.phonetics?.uk}</Text>
      <Text>🇺🇸 {word.phonetics?.us}</Text>

      <View style={styles.audioButtons}>
        {word.audio?.uk && (
          <Button title="▶️ UK" onPress={() => playSound(word.audio.uk)} />
        )}
        {word.audio?.us && (
          <Button title="▶️ US" onPress={() => playSound(word.audio.us)} />
        )}
      </View>

      <Text style={styles.label}>Definitions</Text>
      {Object.entries(word.definitions || {}).map(([pos, def]) => (
        def ? <Text key={pos}>• ({pos}) {def}</Text> : null
      ))}

      <Text style={styles.label}>Vietnamese</Text>
      {Object.entries(word.vietnamese || {}).map(([pos, vi]) => (
        vi ? <Text key={pos}>• ({pos}) {vi}</Text> : null
      ))}

      <Text style={styles.label}>Examples</Text>
      {word.examples?.map((item, i) => (
        <Text key={i}>• {item}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  label: { marginTop: 16, fontWeight: '600', fontSize: 16 },
  audioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 12,
  },
});
