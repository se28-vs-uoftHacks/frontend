import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
const Stack = createStackNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'log-in' : 'log-in-outline'}
              size={size}
              color={'#059905'}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={LoginScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'calendar' : 'calendar-outline'}
              size={size}
              color={'#059905'}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={'#059905'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default function App() {
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
    Prompt_400Regular,
    Poppins_400Regular,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
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
