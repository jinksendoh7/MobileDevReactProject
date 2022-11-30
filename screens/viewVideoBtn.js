import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "../styles/viewVideoBtnStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewVideoButton(props) {
  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor="#cccccc"
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}><MaterialIcons name="ondemand-video" size={30} /> Watch</Text>
      </View>
    </TouchableHighlight>
  );
}

ViewVideoButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
