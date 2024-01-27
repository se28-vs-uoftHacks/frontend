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

const BirdRow = () => {
  return (
    <View style={styles.flappyRow}>
      <View style={styles.flappyBird} />
      <View style={styles.flappyBird} />
      <View style={styles.flappyBird} />
    </View>
  );
};

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.dashboardContainer}>
          <View style={styles.gridItem}>
            <View style={styles.pipeContainer}></View>
            <BirdRow></BirdRow>
            <View style={styles.pipe2Container}></View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipeContainer}></View>
            <BirdRow></BirdRow>
            <View style={styles.pipe2Container}></View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.pipeContainer}></View>
            <BirdRow></BirdRow>
            <View style={styles.pipe2Container}></View>
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
    backgroundColor: 'blue',
    flex: 1, // Each grid item takes equal space
    borderWidth: 1, // Add borders or styling as needed
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 95,
  },
  pipeContainer: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'red',
    height: 200,
  },
  pipe2Container: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'pink',
    height: 160,
  },
  flappyRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', // Ensure it takes the full width
    justifyContent: 'center',
    alignItems: 'center',
  },
  flappyBird: {
    backgroundColor: 'orange',
    width: 20,
    height: 20,
    margin: 20,
    borderRadius: 10, // Make it a circle
  },
});

export default DashboardScreen;
