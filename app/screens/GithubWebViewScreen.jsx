import React,{useState, useEffect} from 'react';
import { WebView } from 'react-native-webview';
import data from '../../data.json'; 
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Create a new component for the WebView screen
const GitHubWebViewScreen = ({navigation}) => {

  const [github, setGitHub] = useState(''); // State for GitHub handle

  useEffect(() => {
    // Retrieve data from AsyncStorage when the component mounts
    AsyncStorage.getItem('cvData')
      .then((dataFromStorage) => {
        if (dataFromStorage) {
          const parsedData = JSON.parse(dataFromStorage);
          setGitHub(parsedData.githubLink);
        }
      })
      .catch((error) => {
        console.error('Error retrieving data from AsyncStorage:', error);
      });
  }, []);


  return (
    <>
      <WebView
        source={{ uri: github }} // Replace with your GitHub URL
        style={{ flex: 1}}
      />
    </>
  );
};



export default GitHubWebViewScreen;