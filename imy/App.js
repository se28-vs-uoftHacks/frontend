import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "./screens/LoginScreen"
import UploadScreen from "./screens/LoginScreen"
import Dashboard from "./screens/DashboardScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        }}
        // screenOptions={({ route }) => ({
        //     tabBarActiveTintColor: 'tomato',
        //     tabBarInactiveTintColor: 'gray',
        //   })}
      >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Dashboard" component={LoginScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )

  const BottomTabNavigator () => {
    <Tab.Navigator>
      
    </Tab.Navigator>
  }
}
