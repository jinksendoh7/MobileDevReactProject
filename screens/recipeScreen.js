import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  Platform,
  Alert,
} from "react-native";
import styles from "../styles/recipeScreenStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { db, firestore, auth } from "../FirebaseConfig";
import ViewEmailBtn from "./viewEmailBtn";
import ViewVideoBtn from "./viewVideoBtn";
import Carousel, { Pagination } from "react-native-snap-carousel";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
  //console.log(item.title);
  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();

  //get recipelist
  let reci = firestore.collection("Recipe");
  const [descriptionArr, setDescriptionArr] = useState([]);
  const [ingredientsArr, setIngredientsArr] = useState([]);
  //const [RecipesArray, setRecipesArray] = useState([]);
  const recipes = [];
  let methodsArrayyy = [];
  let ingredientsArrayyy = [];

  useEffect(() => {
    return reci.onSnapshot((querySnapshot) => {
      //setRecipesArray("");
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

        recipes.map((data) => {
          if (data.title == item.title) {
            methodsArrayyy = [];
            ingredientsArrayyy = [];
            //setRecipesArray(data);

            data.description.map((item) => {
              methodsArrayyy.push(item);
              //methodsArrayyy.push(data.description);
            });

            data.ingredients.map((item) => {
              ingredientsArrayyy.push(item);
            });
          }
        });

        // clear data currently stored
        setDescriptionArr("");
        const desArray = methodsArrayyy;
        //console.log(desArray);
        //const desArray = doc.data().description;
        desArray.forEach((entry) => {
          setDescriptionArr((prev) => prev + `${entry} \n \n`);
        });
        console.log(descriptionArr);
        // clear data currently stored
        setIngredientsArr("");
        //const ingArray = methodsArrayyy[0].ingredients;
        const ingArray = ingredientsArrayyy;
        ingArray.forEach((entry) => {
          setIngredientsArr((prev) => prev + `${entry} \n`);
        });
      });
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const html =
    `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Try this recipe : ` +
    item.title +
    `
    </h1>
    <h3>Information:</h3>
    <p>` +
    item.cuisine +
    `\n` +
    item.preparation +
    ` minutes preparing\n` +
    item.time +
    ` minutes cooking` +
    item.serving +
    ` serves</p>

    <img
      src=` +
    item.photo_url +
    `
      style="width: 30vw; height: 30vw" />
<h3>Ingredients:</h3>
` +
    ingredientsArr +
    `

<h3>Methods:</h3>
` +
    descriptionArr +
    `
  </body>
</html>
`;

  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    Alert.alert("File has been saved to:", uri)
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={true}
            autoplay={true}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="#EF8D32"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>

        <View style={styles.infoContainer}>
          <MaterialIcons name="timer" size={20} />
          <Text style={styles.infoRecipeTop}>
            Prep: {item.preparation} minutes Cook: {item.time} minutes
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="food-bank" size={20} />
          <Text style={styles.infoRecipeTop}>serves {item.serving}</Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewVideoBtn
            onPress={() => {
              let cuisineName = item.title;
              let data = item;
              let title = "Cooking Tutorial for " + item.title;
              navigation.navigate("WatchVideo", {
                cuisineName,
                title,
                data,
              });
            }}
          />
        </View>

        <Text style={styles.infoRecipe}>Ingredients:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{ingredientsArr}</Text>
        </View>

        <Text style={styles.infoRecipe}>Cooking Instructions:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{descriptionArr}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <ViewEmailBtn
            onPress={() => {
              let cuisine = item;
              navigation.navigate("Email", {
                cuisine,
              });
            }}
          />

          {/* <Button onPress={print}> */}
            <MaterialIcons name="print" size={50} color="#EF8D32" padding= "10" onPress={print}/>
          {/* </Button> */}
          <View style={styles.spacer} />
          <MaterialIcons name="picture-as-pdf" size={50} color="#EF8D32" padding= "10" onPress={printToFile}/>
          {/* <Button title="Print to PDF file" onPress={printToFile} /> */}
          {Platform.OS === "ios" && (
            <>
              <View style={styles.spacer} />
              <Button title="Select printer" onPress={selectPrinter} />
              <View style={styles.spacer} />
              {selectedPrinter ? (
                <Text
                  style={styles.printer}
                >{`Selected printer: ${selectedPrinter.name}`}</Text>
              ) : undefined}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
