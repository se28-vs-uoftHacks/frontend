import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "./screens/LoginScreen"

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
        <Tab.Screen name="imyBoard" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
