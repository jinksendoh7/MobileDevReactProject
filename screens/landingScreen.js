import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableHighlight,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import styles from "../styles/landingScreenStyles";
import { db, firestore, auth } from "../FirebaseConfig";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const { width: viewportWidth } = Dimensions.get("window");

export default function AboutScreen({ navigation }) {
  //  const { navigation, route } = props;
  // const item = route.params?.item;

  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();
  console.log(slider1Ref);
  //get recipelist
  let reci = firestore.collection("Recipe");
  const [RecipesArray, setRecipesArray] = useState([]);
  const [photoArr_len, setphotoArr_len] = useState(0);
  let photoArr = [];
  useEffect(() => {
    return reci.onSnapshot((querySnapshot) => {
      setRecipesArray("");
      setphotoArr_len(0)
      photoArr = [];
      querySnapshot.forEach((doc) => {
        photoArr.push(doc.data().photo_url);

        //console.log(photoArr);
        setRecipesArray(photoArr);
      });
      setphotoArr_len(photoArr.length);
      
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );
console.log(photoArr_len)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require("../images/logo.png")} />
        </View>

        <Text
          style={styles.title}
          onPress={() => {
            navigation.navigate("Menu");
          }}
        >
          Array of <Text style={styles.text}>Cuisine</Text> <MaterialCommunityIcons name="arrow-left" size={40} />
        </Text>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={slider1Ref}
              data={RecipesArray}
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
              dotsLength={photoArr_len}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref.current}
              tappableDots={!!slider1Ref.current}
            />
          </View>
        </View>

        <Text style={styles.weDo}>App developer Info:</Text>
        {/* <Text style={styles.offering}>CATERING || DINE-IN || DELIVERY</Text> */}

        <View style={styles.infoContainer}>
          <MaterialIcons name="local-phone" size={30} />
          <Text style={styles.infoAdd}>519-701-0867</Text>
        </View>
        <View style={styles.infoContainer}>
          <MaterialIcons name="location-on" size={30} />
          <Text style={styles.infoAdd}>
            1176 Castlefairies Lisa St. London, ON
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <MaterialIcons name="business" size={30} />
          <Text style={styles.infoAdd}>
            Food Binge Incorporated 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
