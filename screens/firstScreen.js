import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  FlatList,
  TouchableHighlight,
  Image,
  Text,
  Alert,
} from "react-native";
import { db, firestore, auth } from "../FirebaseConfig";
import styles from "../styles/firstScreenStyles";

export default function MainView({ navigation }) {
  //     [loggedIn, setLoggedIn] = useState(false);
  // const signoutWithFirebase = () => {
  //   auth.signOut().then(function () {
  //     // if logout was successful
  //     if (!auth.currentUser) {
  //       Alert.alert('user was logged out!');
  //       setLoggedIn(false);
  //       navigation.popToTop()
  //     }
  //   });
  // }

  const [categoriesArray, setCategoriesArray] = useState([]);

  let lists = firestore.collection("Cuisine");

  useEffect(() => {
    return lists.onSnapshot((querySnapshot) => {
      const categoryList = [];
      querySnapshot.forEach((doc) => {
        //const { title, complete } = doc.data();
        categoryList.push({
          id: Number(doc.id),
          name: doc.data().name,
          photo_url: doc.data().photo_url,
        });
        setCategoriesArray(categoryList);
      });
      console.log(categoryList)
    });
  }, []);

  //get recipelist
  let reci = firestore.collection("Recipe");
  const recipes = [];
  const [RecipesArray, setRecipesArray] = useState([]);
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
        });

        setRecipesArray(recipes);
      });
    });
  }, []);

  function getNumberOfRecipes(categoryId) {
    let count = 0;

    RecipesArray.map((data) => {
      if (Number(data.category) == categoryId) {
        count++;
      }
    });
    return count;
  }

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    //console.log(category);
    // console.log(title);
    navigation.navigate("RecipeList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#cccccc"
      onPress={() => onPressCategory(item)}
    >
      <View style={styles.categoriesItemContainer}>
        {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text> */}

        <ImageBackground
          source={{ uri: item.photo_url }}
          style={styles.categoriesBackground}
        >
          <View style={styles.categoriesNameView}>
            <Text style={styles.categoriesName}>{item.name}</Text>
            <Text style={styles.categoriesInfo}>
              {getNumberOfRecipes(item.id)} recipes
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categoriesArray}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
    // <Button style={styles.buttonShared} title="Sign Out" onPress={signoutWithFirebase} />
  );
}
