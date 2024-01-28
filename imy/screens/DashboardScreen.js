import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';
import getBirdFileName from './BirdMap';
import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import downPipe from '../assets/shorter_down_pipe.png';
import upPipe from '../assets/short_up_pipe.png';
import { Image, Animated } from 'react-native';
import crown from '../assets/crown.png';
import poopIcon from '../assets/poop.png';
import ground from '../assets/ground.jpg';
import { useEffect, useState } from 'react';

// make birds shake lmao
const shakeAnimation = new Animated.Value(-250);

const startFullTravel = () => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: 280,
      duration: 2500, // Adjust the duration for the full travel
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -250, // Adjust the value to move birds above the screen
      duration: 0, // No duration, immediate move
      useNativeDriver: true,
    }),
  ]).start(() => {
    // Start the second animation after the first one completes
    startHalfTravel();
  });
};

const startHalfTravel = () => {
  Animated.timing(shakeAnimation, {
    toValue: 0,
    duration: 1250, // Adjust the duration for half travel
    useNativeDriver: true,
  }).start();
};
// Use the animated value in your styles
const shakeStyle = {
  transform: [{ translateY: shakeAnimation }],
};

const BirdRow = ({ birdImages, showCrown, showPoop }) => {
  return (
    <View style={styles.flappyRow}>
      {birdImages.map((bird, index) => (
        <View key={index}>
          <Image
            source={getBirdFileName(bird.profileIcon)}
            style={styles.flappyBird}
          />
          {showCrown && index === 0 && (
            <Image source={crown} style={styles.crownIcon} />
          )}
          {showPoop && index === birdImages.length - 1 && (
            <Image source={poopIcon} style={styles.poopIcon} />
          )}
        </View>
      ))}
    </View>
  );
};

const DashboardScreen = () => {
  const [birdList, setBirdList] = useState([]);

  // birdList is given in ascending order based on score
  const birdImagesRow3 = birdList.slice(0, 3);
  const birdImagesRow2 = birdList.slice(3, 6);
  const birdImagesRow1 = birdList.slice(6, 9);

  useEffect(() => {
    startFullTravel();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.2.83:8080/dashboard');
        setBirdList(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData(); // Call the function to make the request
  }, []);

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
                showPoop={true}
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
                showPoop={false}
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
                showPoop={false}
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
    borderRadius: 10, // Make it a circle
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
});

export default DashboardScreen;
