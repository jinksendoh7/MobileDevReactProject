import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import styles from "../styles/sendEmailStyles";
import { db, firestore, auth } from "../FirebaseConfig";

export default function EmailScreen(props) {
  const { navigation, route } = props;
  const messageRecipe = route?.params?.cuisine;
  const [message, setMessage] = useState();
  const recipes = [];
  var msgData = "";
  let methodsArrayyy = [];
  let ingredientsArrayyy = [];
  const [descriptionArr, setDescriptionArr] = useState([]);
  const [ingredientsArr, setIngredientsArr] = useState([]);
  let reci = firestore.collection("Recipe");

  useEffect(() => {
    return reci.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //const { title, complete } = doc.data();
        recipes.push({
          id: Number(doc.id),
          category: Number(doc.data().categoryId),
          photo_url: doc.data().photo_url,
          title: doc.data().title,
          preparation: doc.data().preparation,
          time: doc.data().time,
          description: doc.data().description,
          quote: doc.data().quote,
          photosArray: doc.data().photosArray,
          serving: doc.data().serving,
          ingredients: doc.data().ingredients,
          cuisine: doc.data().cuisine,
          video: doc.data().videoUrl,
        });

        setMessage("");

        recipes.map((data) => {
          if (data.title == messageRecipe.title) {
            methodsArrayyy = [];
            data.description.map((item) => {
              methodsArrayyy.push(item);
              //methodsArrayyy.push(data.description);
            });

            ingredientsArrayyy = [];
            data.ingredients.map((item) => {
              ingredientsArrayyy.push(item);
            });

            msgData = "";
            msgData =
              "Cuisine: " +
              data.cuisine +
              "\n" +
              "Name: " +
              data.title +
              "\n" +
              "Prep: " +
              data.preparation +
              " minutes " +
              "\n" +
              "Cook: " +
              data.time +
              " minutes " +
              "\n" +
              "Serving: " +
              data.serving +
              " serves " +
              "\n" +
              "Video Tutorial: " +
              data.video +
              "\n \n";
            setMessage(msgData);
          }
        });

        // clear data currently stored
        setDescriptionArr("");
        const desArray = methodsArrayyy;
        desArray.forEach((entry) => {
          setDescriptionArr((prev) => prev + `\n ${entry} \n \n`);
        });

        console.log("wat");
        // clear data currently stored
        setIngredientsArr("");
        const ingArray = ingredientsArrayyy;
        ingArray.forEach((entry) => {
          setIngredientsArr((prev) => prev + `\n ${entry}`);
        });

        console.log(desArray);
      });
    });
  }, []);

  const returnPage = () => {
    navigation.goBack();
  };

  const sending = () => {
    Alert.alert("Email Sent!", "Your Email has been sent successfully!", [
      {
        text: "Okay ",
        onPress: returnPage, //after success, return to recipe page
      },
    ]);
  };

  const [emailadd, setEmailadd] = useState();

  const onChangeHandlerEmail = (value) => {
    setEmailadd(value);
  };

  sendMessageWithEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [emailadd],
        subject: "Try this recipe ",
        body:
          message +
          "Instructions: " +
          "\n" +
          descriptionArr +
          "Ingredients: " +
          "\n" +
          ingredientsArr,
      };

      try {
        sending();
        const { status } = await MailComposer.composeAsync(options);
        if (status === "sent") {
          sending();
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert("Unable To Send Email", JSON.stringify(error.message), [
          {
            text: "OK",
          },
        ]);
      }
    } else {
      Alert.alert("Email is not available!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: "20%" }}>
        You are going to send this recipe to :{"\r\n"}
      </Text>

      <View style={styles.form}>
        <Text style={styles.labelemail}>EMAIL</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeHandlerEmail}
        />
        <ScrollView>
          <Text style={styles.messageText}>
            {message} Instructions: {descriptionArr} Ingredients:{" "}
            {ingredientsArr}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.buttonContainerSmsScreen}>
        <TouchableHighlight
          style={styles.buttonEmail}
          onPress={sendMessageWithEmail}
        >
          <Text style={styles.text}>Email recipe..</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
