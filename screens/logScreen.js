import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import styles from "../styles/styles";
import { db, firestore, auth } from "../FirebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTogglePasswordVisibility } from "../hooks/useTooglePasswordVisibility";

export default function LogScreen({ navigation }) {
  [loginEmail, setLoginEmail] = useState("");
  [loginPassword, setLoginPassword] = useState("");
  [loggedIn, setLoggedIn] = useState(false);
  [databaseData, setDatabaseData] = useState("");

 const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const register = async () => {
    navigation.navigate("Register");
  };

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert("Password should more than 4 characters");
      return;
    }

    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert("Welcome to Food Binge Food App! \nEnjoy!");
        setLoggedIn(true);

        navigation.navigate("FrontPage", { otherParam: "Cuisine List" });

        // load data
        //retrieveDataFromFirebase();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.sharedContainer}>
        <View  style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../images/foodieWhite.png")}
          />
        </View>

        <Text style={styles.logText}>Hello</Text>
        <Text style={styles.logSubText}>Sign into your account</Text>
        <View style={styles.form}>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(value) => setLoginEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="email"
              style={styles.inputField}
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(value) => setLoginPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              secureTextEntry={passwordVisibility}
              enablesReturnKeyAutomatically
              placeholder="password"
              style={styles.inputField}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                name={rightIcon}
                size={22}
                color="#BECA5C"
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.buttonShared} onPress={loginWithFirebase}>
          <Text style={styles.text}>Log In</Text>
        </Pressable>
        <Text style={styles.logBotSubText}>
          Don't have an account?
          <Pressable>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#AA2B1D" }}
              onPress={register}
            >
              {" "}
              Register Now
            </Text>
          </Pressable>
        </Text>
      </View>
    </ScrollView>
  );
}
