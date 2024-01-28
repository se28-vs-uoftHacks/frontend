import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import UploadScreen from './screens/UploadScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountScreen from './screens/AccountScreen';
import RegisterScreen from './screens/RegisterScreen';
import {
  useFonts,
  PressStart2P_400Regular,
} from '@expo-google-fonts/press-start-2p';
import { Prompt_400Regular } from '@expo-google-fonts/prompt';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { AuthContextProvider } from './hooks/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-circle-outline'}
              size={size}
              color={'#059905'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
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

  if (!fontsLoaded) {
    return;
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TabNavigator" component={BottomTabNavigator} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
