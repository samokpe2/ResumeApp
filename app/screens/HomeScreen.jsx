import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../../data.json'; // Import your JSON data
import { useIsFocused } from "@react-navigation/native";

function HomeScreen({ navigation}) {

  const isFocused = useIsFocused();

  const openGitHubProfile = () => {
    navigation.navigate('GitHub Profile'); // Navigate to the WebView screen
  };

  const openEditScreen = () => {
    navigation.navigate('Edit CV'); // Navigate to the Edit screen
  };

  const [cvData, setCvData] = useState(null);

  useEffect(() => {

    console.log("run");
    // Check if 'cvData' exists in AsyncStorage
    AsyncStorage.getItem('cvData')
      .then((storedData) => {
        if (storedData) {
          // If 'cvData' exists, parse and set it
          setCvData(JSON.parse(storedData));
        } else {
          // If 'cvData' doesn't exist, set it to the initial 'data' from JSON
          AsyncStorage.setItem('cvData', JSON.stringify(data))
            .then(() => {
              console.log('Data saved successfully to AsyncStorage');
              setCvData(data);
            })
            .catch((error) => {
              console.error('Error saving data to AsyncStorage:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error retrieving data from AsyncStorage:', error);
      });
  }, [isFocused]);


  return (
    <>
      <View>
        <TouchableOpacity onPress={openEditScreen}>
          <View style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit CV</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{cvData?.name}</Text>
        <Text style={styles.username}>{cvData?.slack_username}</Text>
        <TouchableOpacity onPress={openGitHubProfile}>
          <View style={{ backgroundColor: '#400d40', padding: 10, marginTop: 20, marginBottom: 10, borderRadius: 40 }}>
            <Text style={{ fontSize: 16, color: 'white' }}>Open GitHub Profile</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.bio}>{cvData?.bio}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    marginVertical: 10,
  },
  username: {
    fontSize: 16,
    color: '#777',
  },
  editButton: {
    position: 'relative',
    top: 10, // Adjust the top position as needed
    right: '-75%', // Adjust the right position as needed
    backgroundColor: '#400d40',
    padding: 10,
    borderRadius: 10,
    width: '20%',
  },
  editButtonText: {
    fontSize: 16,
    color: 'white',
  },
  bio: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;
