import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    Button,
} from 'react-native';
import { useState } from 'react';
import flappyBgImage from '../assets/flappy_bg.jpg';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

import {
    useFonts,
    PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import { Prompt_400Regular } from '@expo-google-fonts/prompt';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

const AccountScreen = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        PressStart2P_400Regular,
        Prompt_400Regular,
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [forgotPasswordText, setForgotPasswordText] = useState('Forgot Password?')
    const { signOut } = useAuth()

    const handleLogout = () => {
        // signs you out yay
        signOut();
        navigation.navigate("Login");

    };

    return (

        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Account</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.enterButton} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buffer}></View>
            </ImageBackground>
        </View>
    );
};

AccountScreen.options = {
    headerShown: false,
};

const styles = StyleSheet.create({
    welcome: {
        fontFamily: 'PressStart2P_400Regular',
        color: 'white',
        fontSize: 40,
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
    welcomeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
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
        marginBottom: '80%',
    },
    enterButton: {
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
    buffer: {
        height: 40,
    },
});

export default AccountScreen;
