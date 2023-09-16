import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen';
import GitHubWebViewScreen from './app/screens/GithubWebViewScreen';
import EditScreen from './app/screens/EditScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GitHub Profile" component={GitHubWebViewScreen} />
        <Stack.Screen name="Edit CV" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;