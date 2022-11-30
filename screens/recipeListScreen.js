import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "../styles/recipeListStyles";
import { db, firestore, auth } from "../FirebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;
  const item = route?.params?.category;
     
  let reci = firestore.collection("Recipe");
  const [RecipesArray, setRecipesArray] = useState([]);
  const recipes = [];
  const recipesArrayyy = [];
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
        });

        //console.log(recipes)
       
      });

setRecipesArray("");
      recipes.map((data) => {
        if (data.cuisine == item.name) {
        //  console.log("recipe collection " + data.cuisine)
        //  console.log("cuisine collection " + item.name)
          recipesArrayyy.push(data);
          setRecipesArray(recipesArrayyy);
        }
         //console.log(recipesArrayyy.length)
      
      });
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

//console.log(RecipesArray.length)
  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      activeOpacity={0.4}
      underlayColor="#cccccc"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>
          <MaterialIcons name="timer" size={20} />
          {item.time} minutes
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        // showsVerticalScrollIndicator={false}
        // numColumns={2}
        data={RecipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
