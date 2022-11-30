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

export default function RegisterScreen({ navigation }) {
  [registrationEmail, setRegistrationEmail] = useState("");
  [registrationPassword, setRegistrationPassword] = useState("");
  [loggedIn, setLoggedIn] = useState(false);
  [databaseData, setDatabaseData] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const login = async () => {
    navigation.navigate("Log");
  };

  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert("Password should more than 4 characters");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert("User registered! Welcome to Food Binge Recipes!");

        navigation.navigate("FrontPage", { otherParam: "Cuisine List" });

        setRegistrationEmail("");
        setRegistrationPassword("");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.sharedContainer}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../images/foodieWhite.png")}
          />
        </View>

        <Text style={styles.logSubText}>Create an account</Text>
        <View style={styles.form}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(value) => setRegistrationEmail(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              placeholder="email"
            />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(value) => setRegistrationPassword(value)}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="password"
              secureTextEntry={passwordVisibility}
              enablesReturnKeyAutomatically
              //keyboardType="invisible-password"
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

        <Pressable
          style={styles.buttonShared}
          onPress={registerWithFirebase}
        >
          <Text style={styles.text}>Register Now</Text>
        </Pressable>
        <Text style={styles.logBotSubText}>
          Already have an account?
          <Pressable>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#AA2B1D" }}
              onPress={login}
            >
              {" "}
              Login
            </Text>
          </Pressable>
        </Text>
      </View>
    </ScrollView>
  );
}
