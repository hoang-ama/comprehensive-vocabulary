import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WordListScreen from './screens/WordListScreen';
import WordDetailScreen from './screens/WordDetailScreen';
import AddWordScreen from './screens/AddWordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Vocab">
        <Stack.Screen name="Vocab" component={WordListScreen} />
        <Stack.Screen name="Detail" component={WordDetailScreen} />
        <Stack.Screen name="Add" component={AddWordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
