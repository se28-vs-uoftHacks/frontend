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
import { useState } from 'react';
import flappyBgImage from '../assets/account.jpg';
import { useAuth } from '../hooks/AuthContext';
import axios from 'axios';


const AccountScreen = ({ navigation }) => {
  const { user } = useAuth();
  
  const [selectedSprite, setSelectedSprite] = useState(null);
  //change this to be the user's when they fetch
  const [selectedSpriteNum, setSelectedSpriteNum] = useState(1);
  const { signOut } = useAuth();

  const sprites = {
    1: require('../birds/bird_1.png'),
    2: require('../birds/bird_2.png'),
    3: require('../birds/bird_3.png'),
    4: require('../birds/bird_4.png'),
    5: require('../birds/bird_5.png'),
    6: require('../birds/bird_6.png'),
    7: require('../birds/bird_7.png'),
    8: require('../birds/bird_8.png'),
    9: require('../birds/bird_9.png'),
    10: require('../birds/bird_10.png'),
    11: require('../birds/bird_11.png'),
    12: require('../birds/bird_12.png'),
    13: require('../birds/bird_13.png'),
    14: require('../birds/bird_14.png'),
    15: require('../birds/bird_15.png'),
    16: require('../birds/bird_16.png'),
    // Add more sprites as needed
  };

  //helps you to select birdddd yay
  const handleSpriteSelection = (spriteNum) => {
    setSelectedSpriteNum(spriteNum);
    setSelectedSprite(sprites[spriteNum]);
  };

  const handleLogout = () => {
    // signs you out yay
    signOut();
    navigation.navigate('Login');
  };

  //updates the sprite
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.spriteItem}
      onPress={() => handleSpriteSelection(item.number)}
    >
      <Image style={styles.sprite} source={item.source} />
    </TouchableOpacity>
  );

  //sends the sprite to the backend
  const sendSavedSprite = async () => {
    console.log(selectedSpriteNum)
    try {
      const response = await axios.put(
        'http://192.168.2.83:8080/dashboard/profileIcon',
        {
          profileIcon: selectedSpriteNum,
        },
        {
          headers: {
            'x-access-token': user,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        navigation.navigate('Dashboard', { isIconVisible: true });
      }
    }catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={flappyBgImage}>
        <View style={styles.accountContainer}>
          <Text style={styles.account}>Account</Text>
        </View>

        <View style={styles.spriteContainer}>
          {selectedSprite ? (
            <>
              <Image style={styles.selectedSprite} source={selectedSprite} />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={sendSavedSprite}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.placeholderText}>Select a sprite</Text>
          )}
        </View>

        <FlatList
          data={Object.keys(sprites).map((key) => ({
            number: parseInt(key),
            source: sprites[key],
          }))}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={(item) => item.number.toString()}
          contentContainerStyle={styles.flatListContent}
        />

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
  account: {
    fontFamily: 'PressStart2P_400Regular',
    color: 'white',
    fontSize: 40,
    marginTop: '5%',
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
  accountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  spriteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '45%',
    fontFamily: 'PressStart2P_400Regular',
  },
  selectedSprite: {
    width: 170,
    height: 120,
    marginTop: '-50%',
  },
  flatList: {
    flex: 4,
    marginTop: 10,
    backgroundColor: 'white',
  },
  spriteItem: {
    flex: 1,
    margin: 10,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  enterButton: {
    backgroundColor: '#0CA41C',
    padding: 5,
    borderRadius: 20,
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
  placeholderText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16, 
    color: 'white', 
  },
  saveButton: {
    backgroundColor: '#0CA41C',
    padding: 5,
    borderRadius: 15,
    marginTop: '8%',
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  buffer: {
    height: 40,
  },
});

export default AccountScreen;
