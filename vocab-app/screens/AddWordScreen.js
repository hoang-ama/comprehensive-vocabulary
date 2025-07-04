import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function AddWordScreen({ navigation }) {
  const [word, setWord] = useState('');
  const [phoneticsUK, setPhoneticsUK] = useState('');
  const [phoneticsUS, setPhoneticsUS] = useState('');
  const [definition, setDefinition] = useState('');
  const [vietnamese, setVietnamese] = useState('');
  const [example, setExample] = useState('');

  const handleSubmit = async () => {
    if (!word || !definition) {
      Alert.alert('Missing fields', 'Word and definition are required.');
      return;
    }

    try {
      await api.post('/words', {
        word,
        phonetics: { uk: phoneticsUK, us: phoneticsUS },
        partOfSpeech: ["noun"],
        definitions: { noun: definition },
        vietnamese: { noun: vietnamese },
        examples: [example]
      });
      Alert.alert('Success', 'Word added!');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to add word.');
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Word</Text>
      <TextInput style={styles.input} value={word} onChangeText={setWord} placeholder="e.g. concrete" />
      <Text style={styles.label}>Phonetics UK</Text>
      <TextInput style={styles.input} value={phoneticsUK} onChangeText={setPhoneticsUK} />
      <Text style={styles.label}>Phonetics US</Text>
      <TextInput style={styles.input} value={phoneticsUS} onChangeText={setPhoneticsUS} />
      <Text style={styles.label}>Definition</Text>
      <TextInput style={styles.input} value={definition} onChangeText={setDefinition} multiline />
      <Text style={styles.label}>Vietnamese</Text>
      <TextInput style={styles.input} value={vietnamese} onChangeText={setVietnamese} multiline />
      <Text style={styles.label}>Example</Text>
      <TextInput style={styles.input} value={example} onChangeText={setExample} multiline />
      <View style={{ marginTop: 20 }}>
        <Button title="Save Word" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
});
