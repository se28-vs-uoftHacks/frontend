import { StyleSheet, Text, View, ImageBackground } from "react-native"
import flappyBgImage from "../assets/flappy_bg.jpg"

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.innerContainer}>
          <Text>Login Screen</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default LoginScreen
