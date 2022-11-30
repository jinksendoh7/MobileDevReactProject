import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
} from "react-native";
import styles from "../styles/watchVideoStyles";
import { db, firestore, auth } from "../FirebaseConfig";
import YoutubePlayer from "react-native-youtube-iframe";
import { MaterialIcons } from "@expo/vector-icons";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.cuisineName;
  //console.log(item);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);


  let reci = firestore.collection("Recipe");
  const [vidUrlink, setVidUrlink] = useState([]);
const [quoteFood, setQuoteFood] = useState([]);

  const recipes = [];
  var vidUrl = "";
  useEffect(() => {
    // clear data currently stored
    setVidUrlink("");
    setQuoteFood("");
    return reci.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
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
          if (data.title == item) {
            const vidUrl_substring = data.video;
            vidUrl = vidUrl_substring.substring(
              vidUrl_substring.indexOf(".be/") + 4
            );
            setVidUrlink(vidUrl);

      
            setQuoteFood(data.quote)
            // console.log("data.title " + data.title);
            // console.log("item " + item);
            // console.log(vidUrl);
          }
        });
      });
    });
  }, []);


  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const controlRef = useRef();
  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  const seekBackAndForth = (control) => {
    console.log("currentTime");
    controlRef.current?.getCurrentTime().then((currentTime) => {
      control === "forward"
        ? controlRef.current?.seekTo(currentTime + 15, true)
        : controlRef.current?.seekTo(currentTime - 15, true);
    });
  };
  const muteVideo = () => setMute(!isMute);
  const ControlIcon = ({ name, onPress }) => (
    <MaterialIcons onPress={onPress} name={name} size={40} color="#fff" />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{quoteFood}</Text>
      <YoutubePlayer
        height={230}
        ref={controlRef}
        play={playing}
        mute={isMute}
        videoId={vidUrlink}
        onChangeState={onStateChange}
      />
      
      <View style={styles.controlContainer}>
        <MaterialIcons
          onPress={() => seekBackAndForth("rewind")}
          name="skip-previous"
          size={30}
        />
        <MaterialIcons
          onPress={togglePlaying}
          name={playing ? "pause" : "play-arrow"}
             size={30}
        />
        <MaterialIcons
          onPress={() => seekBackAndForth("forward")}
          name="skip-next"
             size={30}
        />
      
      <MaterialIcons
        onPress={muteVideo}
        name={isMute ? "volume-up" : "volume-off"}
           size={30}
      />
      </View>
    </View>
  );
}
