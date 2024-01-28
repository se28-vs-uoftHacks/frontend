import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import placeHolderImage from '../assets/placeholder.png';
import { useState, useEffect } from 'react';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  FlatList,
  Image,
} from 'react-native';

const images = Array(16).fill(placeHolderImage);

const UploadScreen = () => {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  // right now, we don't have dynamic text/prompts but we will use something like this once we do
  const [prompt, setPrompt] = useState('');
  const [prompt2, setPrompt2] = useState(''); // we'll likely have two prompts e.g., jan 2021 and pet photos

  // pulls from the backend which generates the daily prompts
  const promptEngineer = () => {
    setPrompt('Jan 2021');
    setPrompt2('Pet Photos');
  };

  const handleUpload = () => {
    // for uploading yay
  };

  useEffect(() => {
    promptEngineer();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>{prompt}</Text>
          <Text style={styles.prompt}>{prompt2}</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.image} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  prompt: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: 30,
    padding: 5,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  promptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-5%',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    color: 'white',
  },
  placeholder: {
    fontFamily: 'Prompt_400Regular',
  },
  forgotPassword: {
    color: 'white',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '7%',
  },
  uploadButton: {
    backgroundColor: '#0CA41C',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '70%',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 20,
  },
  image: {
    width: '100%', // Adjust the width as needed
    height: 150, // Adjust the height as needed
    borderRadius: 20, // Adjust the border radius as needed
    borderColor: '#F1FF8F', // Set the border color
    borderWidth: 10, // Set the border width
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2.5%', // Adjust the padding as needed
  },
  flatListContainer: {
    flex: 4,
  },
});

export default UploadScreen;
