import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import flappyBgImage from '../assets/flappy_bg.jpg'

const LoginScreen = ({ navigation }) => {

    return (
        <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
            <View style={styles.container}>
                <Text>Login Screen</Text>
            </View>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoginScreen

