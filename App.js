import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import HomeScreen from "./screens/homeScreen";
import LogScreen from "./screens/logScreen";
import RegisterScreen from "./screens/registerScreen";
import FirstScreen from "./screens/firstScreen";
import AboutScreen from "./screens/landingScreen";
import RecipesListScreen from "./screens/recipeListScreen";
import RecipesScreen from "./screens/recipeScreen";
import WatchVideoScreen from "./screens/watchVideoScreen";
import EmailScreen from "./screens/sendEmailScreen";
import { useState } from "react";
import { Alert } from "react-native";
import { db, firestore, auth } from "./FirebaseConfig";
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  [loggedIn, setLoggedIn] = useState(false);

  function CustomDrawerContent(props) {
    const { navigation } = props;
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          icon={({ focused, color, size }) => <MaterialIcons color={focused ? '#AA2B1D' : '#EF8D32'} size={size} name={focused ? 'logout' : 'logout'} /> }
          onPress={() => {
            auth.signOut().then(function () {
              // if logout was successful
              if (!auth.currentUser) {
                Alert.alert("user was logged out!");
                setLoggedIn(false);
              }
            });
            navigation.navigate("Home");
          }}
        />
      </DrawerContentScrollView>
    );
  }

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Menu"
          component={FirstScreen}
          options={{ title: "Food Binge Cuisine",
          drawerIcon: ({focused, size}) => (
              <MaterialIcons
                 name="food-bank"
                 size={size}
                 color={focused ? '#AA2B1D' : '#EF8D32'}
              />
           )
           }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "About the app",
          drawerIcon: ({focused, size}) => (
              <MaterialIcons
                 name="restaurant"
                 size={size}
                 color={focused ? '#AA2B1D' : '#EF8D32'}
              />
           )
           }}
        />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Log"
          component={LogScreen}
          options={{ title: "Log In", gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register Account" }}
        />
        <Stack.Screen
          name="FrontPage"
          component={DrawerNavigator}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipesListScreen}
          options={{ title: "Recipe List" }}
        />
         <Stack.Screen
          name="Recipe"
          component={RecipesScreen}
          options={{ title: "Recipe" }}
        />
        <Stack.Screen
          name="WatchVideo"
          component={WatchVideoScreen}
        />
         <Stack.Screen name="Email" component={EmailScreen} />
        {/* <Stack.Screen name='Print' component={PrintScreen} /> */}
        {/* <Drawer.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.name })}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
