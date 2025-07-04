import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import api from '../services/api';

export default function WordListScreen({ navigation }) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    try {
      const res = await api.get('/words');
      setWords(res.data);
    } catch (err) {
      console.log('Error fetching words:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchWords);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="➕ Add New Word"
        onPress={() => navigation.navigate('Add')}
      />
      <FlatList
        data={words}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detail', { word: item })}
          >
            <Text style={styles.word}>{item.word}</Text>
            <Text style={styles.type}>{item.partOfSpeech?.join(', ')}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No words found.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#666',
  },
});
