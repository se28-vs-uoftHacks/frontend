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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordText, setForgotPasswordText] =
    useState('Forgot Password?');
  const { signIn } = useAuth();

  const handleLogin = () => {
    // whatever we need to do on the backend funky bs
    // for now i will just make this redirect to dashboard on enter

    const loginUser = async (username, password) => {
      try {
        const response = await axios.post(
          'http://backend-production-a339.up.railway.app/users/login',
          {
            username: username,
            password: password,
          }
        );

        if (response.status === 200) {
          signIn(response.data.user);
          navigation.navigate('TabNavigator', { screen: 'Dashboard' });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loginUser(username, password);

    // navigation.navigate('Dashboard');
  };

  const handleForgotPassword = () => {
    if (forgotPasswordText === 'Forgot Password?') {
      setForgotPasswordText("sucks lmao don't forget next time");
    } else {
      setForgotPasswordText('Forgot Password?');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>Welcome!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            <Text style={styles.signup}>No account yet? Make one here!</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="white" // Add this line
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="white" // Add this line
            secureTextEntry
          />
          <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
            {forgotPasswordText}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.enterButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buffer}></View>
      </ImageBackground>
    </View>
  );
};

LoginScreen.options = {
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
  signup: {
    color: 'white',
    marginBottom: 30,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins_400Regular',
  },
});

export default LoginScreen;
