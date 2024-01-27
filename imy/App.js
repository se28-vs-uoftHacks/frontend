import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import UploadScreen from './screens/LoginScreen';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import { Prompt_400Regular } from '@expo-google-fonts/prompt';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import DashboardScreen from './screens/DashboardScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
    Prompt_400Regular,
    Poppins_400Regular,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
        // screenOptions={({ route }) => ({
        //     tabBarActiveTintColor: 'tomato',
        //     tabBarInactiveTintColor: 'gray',
        //   })}
      >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

  const BottomTabNavigator = () => {
    <Tab.Navigator></Tab.Navigator>;
  };
}
