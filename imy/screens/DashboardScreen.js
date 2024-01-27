import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
} from 'react-native';
import flappyBgImage from '../assets/flappy_bg_cropped.jpg';
import downPipe from '../assets/shorter_down_pipe.png';
import upPipe from '../assets/short_up_pipe.png';
import { Image } from 'react-native';
import bird1 from '../birds/bird_1.png';
import bird2 from '../birds/bird_2.png';
import bird3 from '../birds/bird_3.png';
import bird4 from '../birds/bird_4.png';
import bird5 from '../birds/bird_5.png';
import bird6 from '../birds/bird_6.png';
import bird7 from '../birds/bird_7.png';
import bird8 from '../birds/bird_8.png';
import bird9 from '../birds/bird_9.png';
import crown from '../assets/crown.png';
import poopIcon from '../assets/poop.png';

const BirdRow = ({ birdImages, showCrown, showPoop }) => {
  return (
    <View style={styles.flappyRow}>
      {birdImages.map((birdImage, index) => (
        <View key={index}>
          <Image source={birdImage} style={styles.flappyBird} />
          {showCrown && index === 0 && (
            <Image source={crown} style={styles.crownIcon} />
          )}
          {showPoop && index === 2 && (
            <Image source={poopIcon} style={styles.poopIcon} />
          )}
        </View>
      ))}
    </View>
  );
};

const DashboardScreen = () => {
  const birdImagesRow1 = [bird1, bird2, bird3];
  const birdImagesRow2 = [bird4, bird5, bird6];
  const birdImagesRow3 = [bird7, bird8, bird9];

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.dashboardContainer}>
          <View style={styles.gridItem}>
            <View style={styles.pipe1Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <BirdRow
              birdImages={birdImagesRow1}
              showCrown={false}
              showPoop={true}
            />
            <View style={styles.pipe2Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipe3Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <BirdRow
              birdImages={birdImagesRow2}
              showCrown={false}
              showPoop={false}
            />
            <View style={styles.pipe4Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipe5Container}>
              <Image source={downPipe} style={styles.pipe_down} />
            </View>
            <BirdRow
              birdImages={birdImagesRow3}
              showCrown={true}
              showPoop={false}
            />
            <View style={styles.pipe6Container}>
              <Image source={upPipe} style={styles.pipe_up} />
            </View>
          </View>
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
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'red',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe2Container: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe3Container: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'red',
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe4Container: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe5Container: {
    marginLeft: 10,
    marginRight: 10,
    // backgroundColor: 'red',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipe6Container: {
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: 'pink',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flappyRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', // Ensure it takes the full width
    justifyContent: 'center',
    alignItems: 'center',
  },
  flappyBird: {
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
  },
  poopIcon: {
    position: 'absolute',
    top: -2, // Adjust the positioning based on your design
    left: 17,
    width: 30.8,
    height: 32,
    transform: [{ rotate: '-22deg' }], // Adjust the degree of rotation
  },
});

export default DashboardScreen;
