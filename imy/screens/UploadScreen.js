import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import placeHolderImage from '../assets/placeholder.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/AuthContext';
import { PROMPTS } from '../constants/prompts';
import bird1 from '../birds/bird_1.png';
import bird2 from '../birds/bird_2.png';
import bird3 from '../birds/bird_3.png';
import bird4 from '../birds/bird_4.png';
import bird5 from '../birds/bird_5.png';
import bird6 from '../birds/bird_6.png';
import bird7 from '../birds/bird_7.png';
import bird8 from '../birds/bird_8.png';
import bird9 from '../birds/bird_9.png';
import { Ionicons } from '@expo/vector-icons';
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
  FlatList,
} from 'react-native';

//random prompt + time generator
const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

//function to generate a random time
const getRandomPastDate = () => {
  const currentDate = new Date();
  const randomDaysAgo = Math.floor(Math.random() * 365); // Random number of days ago (up to a year)
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - randomDaysAgo);

  return pastDate;
};

const randomPastDate = getRandomPastDate();

const UploadScreen = () => {
  const images = Array(16).fill(placeHolderImage); // temporary — we can link to db to determine #
  const [isHeartRed, setHeartRed] = useState(false); // for liked
  const [likedImages, setLikedImages] = useState(
    Array(images.length).fill(false)
  );

  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const [selectImage, setSelectImage] = useState('');
  const { user } = useAuth();

  // get the images to display
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.83:8080/images', {
          headers: {
            'x-access-token': user, // we use user as the token key
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  // const promptEngineer = () => {
  //   setPrompt('Jan 2021');
  //   setPrompt2('Pet Photos');
  // };

  // display all images

  //this allows user to upload image
  const ImagePickerFunction = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      console.log('res', result);
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (selectImage) => {
    console.log(selectImage);

    const formData = new FormData();
    formData.append('image', {
      //endpoints that we send
      uri: selectImage.uri,
      type: selectImage.type,
      name: selectImage.fileName,
    });

    console.log(formData);
    try {
      const uploadResponse = await axios.post(
        //we are using axios to post data to backend
        'http://backend-production-a339.up.railway.app/images/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': user, //we use user as the token key
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

  // useEffect(() => {
  //   promptEngineer();
  // }, []);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>{'Capture a moment from '}</Text>
          <Text style={styles.prompt}>{'Capture a moment from '}</Text>
          <Text style={styles.highlight}>{randomPastDate.toDateString()}</Text>
          <Text style={styles.prompt}> {randomPrompt}</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={images}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.image} />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    const newLikedImages = [...likedImages];
                    newLikedImages[index] = !newLikedImages[index];
                    setLikedImages(newLikedImages);
                  }}
                >
                  <Ionicons
                    name={likedImages[index] ? 'heart' : 'heart-outline'}
                    size={30}
                    color={likedImages[index] ? 'red' : 'black'}
                    style={{ position: 'absolute', top: -130, right: -70 }}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      top: -119,
                      right: -59,
                      fontFamily: 'PressStart2P_400Regular',
                      color: likedImages[index] ? 'white' : 'black',
                      fontSize: 8,
                    }}
                  >
                    1
                  </Text>
                </TouchableOpacity>
                <Image source={bird1} style={styles.icon} />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
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
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
  },
  highlight: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'black',
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
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
    marginTop: '15%',
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
    marginBottom: '7.5%',
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
    width: '100%',
    height: 150,
    borderRadius: 20,
    borderColor: '#F1FF8F',
    borderWidth: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2.5%',
  },
  flatListContainer: {
    flex: 4,
  },
  icon: {
    position: 'absolute',
    left: 8,
    bottom: 6,
    width: 37.7,
    height: 26.7,
  },
});

export default UploadScreen;
