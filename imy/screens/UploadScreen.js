import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import placeHolderImage from '../assets/placeholder.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../hooks/AuthContext';
import { PROMPTS } from '../constants/prompts';
import getBirdFileName from './BirdMap';
import Lightbox from 'react-native-lightbox';

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
  LogBox,
} from 'react-native';

const UploadScreen = () => {
  const [likedImages, setLikedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [alreadyUploaded, setAlreadyUploaded] = useState(false);
  const [isOwner, setIsOwner] = useState([]);
  const [randomPrompt] = useState(
    () => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
  );
  const [imageId, setImageId] = useState([]);
  const [likes, setLikes] = useState([]);
  const [birdId, setbirdId] = useState([]);

  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  //function to generate a random time
  const getRandomPastDate = () => {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 3650); // Random number of days ago (up to a year)
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - randomDaysAgo);

    return pastDate;
  };

  const [randomPastDate] = useState(getRandomPastDate);

  const [selectImage, setSelectImage] = useState('');
  const { user } = useAuth();

  // get the images to display
  useEffect(() => {
    LogBox.ignoreLogs(['Animated']); // stupid annoying errors go byebye

    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://backend-production-a339.up.railway.app/images',
          {
            headers: {
              'x-access-token': user, // we use user as the token key
            },
          }
        );

        // console.log(response.data.images[0].profileIcon);

        response.data.images.forEach(image => {
          // console.log(image._doc);
        });

        

        setImageCount(response.data.images.length);
        setImages(response.data.images.map(image => image._doc.image));

        let imagesArray = response.data.images.map(image => image._doc.image);

        // If the number of images is odd, add an empty element at the end
        if (imagesArray.length % 2 !== 0) {
          imagesArray.push(null);
        }

        setImages(imagesArray);

        setLikedImages(Array(response.data.length).fill(false));
        setIsOwner(response.data.images.map(image => image.isOwner));
        setImageId(response.data.images.map(image => image._doc._id));
        setLikes(response.data.images.map(image => image._doc.likes));
        setbirdId(response.data.images.map(image => image.imagesArray));
        // setbirdId()
      
      } catch (error){
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, [alreadyUploaded]);

  // display all images

  //this allows user to upload image
  const ImagePickerFunction = async () => {
    if (alreadyUploaded) {
      console.log('You have already uploaded an image.');
      alert('You have already uploaded an image today. Come back tomorrow!');
      return;
    }

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

        setAlreadyUploaded(true);
      } else {
        console.error('Image upload failed!');
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle network or other errors
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>{'Capture a moment from '}</Text>
          <Text style={styles.highlight}>{randomPastDate.toDateString()}</Text>
          <Text style={styles.prompt}> {randomPrompt}</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={images}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={1}>
                    {item ? (
                      <Lightbox renderContent={() => (
                        <View style={styles.lightboxImageContainer}>
                          <Image source={{ uri: item }} style={styles.lightboxImage} />
                        </View>
                      )}>
                        <Image source={{ uri: item }} style={styles.image} />
                      </Lightbox>
                    ) : (
                      <Image source={{ uri: item }} style={[styles.image, { opacity: 0 }]} />
                    )}
                  </TouchableOpacity>
                    

                {!isOwner[index] && (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                      const newLikedImages = [...likedImages];
                      newLikedImages[index] = !newLikedImages[index];
                      setLikedImages(newLikedImages);

                      if (newLikedImages[index]) {
                        try {
                          const response = await axios.put(
                            `http://backend-production-a339.up.railway.app/images/like/${imageId[index]}`,
                            {},
                            {
                              headers: {
                                'x-access-token': user, // we use user as the token key
                              },
                            }
                          );

                          if (response.status !== 200) {
                            throw new Error('Response not OK');
                          }

                        // update likes count
                        const newLikes = [...likes];
                        newLikes[index]++;
                        setLikes(newLikes);

                      } catch (error) {
                        console.error('Error liking image', error);
                      }
                    } else {
                      try {
                        const response = await axios.put(`http://192.168.2.83:8080/images/unlike/${imageId[index]}`, {}, {
                          headers: {
                            'x-access-token': user, // we use user as the token key
                          },
                        });
                  
                        if (response.status !== 200) {
                          throw new Error('Response not OK');
                        }
                  
                        // update likes count
                        const newLikes = [...likes];
                        newLikes[index]--;
                        setLikes(newLikes);
                  
                      } catch (error) {
                        console.error('Error unliking image', error);
                      }
                    }
                  }} disabled={!item}>
                    <Ionicons
                      name={likedImages[index] ? 'heart' : 'heart-outline'}
                      size={30}
                      color={likedImages[index] ? 'red' : 'white'}
                      style={[{ position: 'absolute', top: -130, right: -70 }, !item && { opacity: 0 }]} // these values are illegal this is terrible code
                    />
                   <Text style={{ position: 'absolute', top: -119, right: -59, fontFamily: 'PressStart2P_400Regular', color: likedImages[index] ? 'black' : 'white', fontSize: 8 }}>
                    {likes[index] > 0 ? likes[index] : null}
                  </Text>
                  </TouchableOpacity>
                )}
               <Image source={getBirdFileName(Math.floor(Math.random() * 15))} style={[styles.icon, !item && { opacity: 0 }]} />
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
    width: 170,
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
  lightboxImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
    borderColor: '#F1FF8F',
    borderWidth: 10,
  },
});

export default UploadScreen;
