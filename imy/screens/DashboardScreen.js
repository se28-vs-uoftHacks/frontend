import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import downPipe from '../assets/shorter_down_pipe.png';
import upPipe from '../assets/short_up_pipe.png';
import ground from '../assets/ground.jpg';
import getBirdFileName from './BirdMap';
import crown from '../assets/crown.png';
import poopIcon from '../assets/poop.png';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';

// make birds shake lmao
const shakeAnimation = new Animated.Value(-250);

const startFullTravel = (setIsIconVisible) => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: -270, // Adjust the value to move birds above the screen
      duration: 0, // No duration, immediate move
      useNativeDriver: true,
    }),
    Animated.delay(500),
    Animated.timing(shakeAnimation, {
      toValue: 280,
      duration: 2000, // Adjust the duration for the full travel
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -270, // Adjust the value to move birds above the screen
      duration: 0, // No duration, immediate move
      useNativeDriver: true,
    }),
  ]).start(() => {
    // Start the second animation after the delay
    setIsIconVisible(true); // Set isVisible to true here
    // Start the second animation after the first one completes
    startHalfTravel();
  });
};

const startHalfTravel = () => {
  Animated.timing(shakeAnimation, {
    toValue: 0,
    duration: 1200, // Adjust the duration for half travel
    useNativeDriver: true,
  }).start();
};
// Use the animated value in your styles
const shakeStyle = {
  transform: [{ translateY: shakeAnimation }],
};

const BirdRow = ({
  birdImages,
  showCrown,
  showPoop,
  isIconVisible,
  onBirdPress,
}) => {
  return (
    <View style={styles.flappyRow}>
      {birdImages.map((bird, index) => (
        <TouchableOpacity key={index} onPress={() => onBirdPress(bird)}>
          <View>
            <Image
              source={getBirdFileName(bird.profileIcon)}
              style={styles.flappyBird}
            />
            {isIconVisible && showCrown && index === 0 && (
              <Image source={crown} style={styles.crownIcon} />
            )}
            {isIconVisible && showPoop && index === birdImages.length - 1 && (
              <Image source={poopIcon} style={styles.poopIcon} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const DashboardScreen = () => {
  const [birdList, setBirdList] = useState([]);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedBird, setSelectedBird] = useState(null);

  // birdList is given in ascending order based on score
  const birdImagesRow3 = birdList.slice(0, 3);
  const birdImagesRow2 = birdList.slice(3, 6);
  const birdImagesRow1 = birdList.slice(6, 9);

  // Set showPoop based on the conditions
  const showPoopRow3 = birdList.length > 1 && birdImagesRow2.length === 0;
  const showPoopRow2 = birdImagesRow3.length > 0 && birdImagesRow1.length === 0;
  const showPoopRow1 = birdList.length > 1 && birdImagesRow2.length > 0;

  useFocusEffect(
    React.useCallback(() => {
      setIsIconVisible(false);
      // Trigger shake animation when the screen is focused
      startFullTravel(setIsIconVisible);
      // Cleanup function when the screen is unfocused
      return () => {
        // You can perform cleanup here if needed
      };
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://backend-production-a339.up.railway.app/dashboard'
        );
        setBirdList(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the function to make the request
  }, [isIconVisible]);

  const handleBirdPress = (bird) => {
    setSelectedBird(bird);
    setLightboxVisible(true);
  };

  const closeModal = () => {
    setLightboxVisible(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.dashboardContainer}>
          <View style={styles.gridItem}>
            <View style={styles.pipe1Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <Animated.View style={shakeStyle}>
              <BirdRow
                birdImages={birdImagesRow1}
                showCrown={false}
                showPoop={showPoopRow1}
                isIconVisible={isIconVisible}
                onBirdPress={handleBirdPress}
              />
            </Animated.View>
            <View style={styles.pipe2Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipe3Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <Animated.View style={shakeStyle}>
              <BirdRow
                birdImages={birdImagesRow2}
                showCrown={false}
                showPoop={showPoopRow2}
                isIconVisible={isIconVisible}
                onBirdPress={handleBirdPress}
              />
            </Animated.View>
            <View style={styles.pipe4Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipe5Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <Animated.View style={shakeStyle}>
              <BirdRow
                birdImages={birdImagesRow3}
                showCrown={true}
                showPoop={showPoopRow3}
                isIconVisible={isIconVisible}
                onBirdPress={handleBirdPress}
              />
            </Animated.View>
            <View style={styles.pipe6Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
        </View>

        <View style={styles.groundContainer}>
          <Image source={ground} style={styles.ground_image} />
        </View>
      </ImageBackground>

      <Modal
        transparent={true}
        visible={lightboxVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.lightboxContainer}>
          <TouchableOpacity
            style={styles.closeLightboxButton}
            onPress={closeModal}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          {selectedBird && (
            <View style={styles.lightboxContent}>
              <Image
                source={getBirdFileName(selectedBird.profileIcon)}
                style={styles.lightboxBirdImage}
              />
              <Text style={styles.lightboxUsername}>
                {selectedBird.username}
              </Text>
              <Text style={styles.lightboxScore}>
                Score: {selectedBird.score}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard_text: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: '40px',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  dashboardContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  gridItem: {
    //backgroundColor: 'blue',
    flex: 1, // Each grid item takes equal space
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 96,
  },
  pipe1Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'red',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe2Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe3Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'red',
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe4Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe5Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: 'red',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe6Container: {
    zIndex: 10,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flappyRow: {
    zIndex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', // Ensure it takes the full width
    justifyContent: 'center',
    alignItems: 'center',
  },
  flappyBird: {
    zIndex: 2,
    width: 56.6,
    height: 40,
    margin: 20,
    resizeMode: 'stretch',
    position: 'relative',
  },
  pipe_down: {
    flex: 1,
    resizeMode: 'stretch',
  },
  pipe_up: {
    flex: 1,
    resizeMode: 'stretch',
  },
  crownIcon: {
    position: 'absolute',
    top: 5, // Adjust the positioning based on your design
    left: 15,
    width: 32.75,
    height: 25.6,
    transform: [{ rotate: '-30deg' }], // Adjust the degree of rotation
    zIndex: 3,
  },
  poopIcon: {
    position: 'absolute',
    top: -2, // Adjust the positioning based on your design
    left: 17,
    width: 30.8,
    height: 32,
    transform: [{ rotate: '-22deg' }], // Adjust the degree of rotation
    zIndex: 3,
  },
  groundContainer: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  ground_image: {
    resizeMode: 'cover',
  },
  lightboxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  closeLightboxButton: {
    position: 'absolute',
    bottom: 270,
    padding: 10,
    backgroundColor: '#0CA41C', // Blue background color
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'PressStart2P_400Regular',
    color: '#fff', // White text color

    fontSize: 16,
  },
  lightboxContent: {
    alignItems: 'center',
  },
  lightboxBirdImage: {
    width: 226.4,
    height: 160,
    marginBottom: 10,
  },
  lightboxUsername: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: 'PressStart2P_400Regular',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  lightboxScore: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DashboardScreen;
