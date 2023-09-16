import React, { useState, useEffect } from 'react';
import {Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function EditScreen({ navigation }) {
  const [name, setName] = useState(''); // State for name
  const [slack_username, setSlackUsername] = useState(''); // State for Slack username
  const [github, setGitHub] = useState(''); // State for GitHub handle
  const [bio, setBio] = useState(''); // State for bio

  useEffect(() => {
    // Retrieve data from AsyncStorage when the component mounts
    AsyncStorage.getItem('cvData')
      .then((dataFromStorage) => {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          setName(parsedData.name);
          setSlackUsername(parsedData.slack_username);
          setGitHub(parsedData.githubLink);
          setBio(parsedData.bio);
        }
      })
      .catch((error) => {
        console.error('Error retrieving data from AsyncStorage:', error);
      });
  }, []);

  const handleSaveChanges = () => {
    // Save changes to the data store (e.g., JSON file or database)
    // You can implement this part as needed
    // After saving, navigate back to the Home Screen
    const updatedData = {
      name: name,
      slack_username: slack_username,
      githubLink: github,
      bio: bio,
    };

    // Save updated data to AsyncStorage
    AsyncStorage.setItem('cvData', JSON.stringify(updatedData))
      .then(() => {
        console.log('Data saved successfully to AsyncStorage');
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error saving data to AsyncStorage:', error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit CV</Text>

      {/* Edit personal information */}
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Slack Username:</Text>
      <TextInput
        style={styles.input}
        value={slack_username}
        onChangeText={(text) => setSlackUsername(text)}
      />
      <Text>GitHub Handle:</Text>
      <TextInput
        style={styles.input}
        value={github}
        onChangeText={(text) => setGitHub(text)}
      />
      <Text>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={(text) => setBio(text)}
        multiline
      />

      {/* Save changes */}
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default EditScreen;
