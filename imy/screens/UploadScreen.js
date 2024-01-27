import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/AuthContext';

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
  Image,
} from 'react-native';

const UploadScreen = () => {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  // right now, we don't have dynamic text/prompts, but we will use something like this once we do
  const [prompt, setPrompt] = useState('');
  const [prompt2, setPrompt2] = useState(''); // we'll likely have two prompts e.g., jan 2021 and pet photos
  const [selectImage, setSelectImage] = useState('');
  const { user } = useAuth();

  const promptEngineer = () => {
    setPrompt('Jan 2021');
    setPrompt2('Pet Photos');
  };

  const ImagePickerFunction = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectImage(result.uri);
      // The rest of your upload logic...
      console.log("res", result)
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (selectImage) => {

    console.log(selectImage)

    const formData = new FormData();
    formData.append('image',{
      uri: selectImage.uri,
      type: selectImage.type,
      name: selectImage.fileName,
    })

    console.log(formData)
    try {
      const uploadResponse = await axios.post(
        'http://192.168.2.83:8080/images/upload',
        formData,
        {  
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': user,
          },
        }
      );

      if (uploadResponse.status === 200) {
        console.log('Image uploaded successfully!');
        // Handle success
      } else {
        console.error('Image upload failed!');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle network or other errors
    }
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
          <Image style={{ height: 400, width: '100%' }} source={{ selectImage }} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              // we will allow the user to pick from their photo library here
              ImagePickerFunction();
            }}
          >
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
    marginTop: '-30%',
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
    marginBottom: '30%',
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
});

export default UploadScreen;
