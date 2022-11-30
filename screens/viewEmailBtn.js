import React from "react";
import { TouchableHighlight, Text, View } from "react-native";
import PropTypes from "prop-types";
//import styles from "../styles/viewVideoBtnStyles";
import { MaterialIcons } from "@expo/vector-icons";

export default function ViewEmailButton(props) {
  return (
    <TouchableHighlight
      activeOpacity={0.3}
      underlayColor="#cccccc"
      onPress={props.onPress}
    >
      <View>
        <MaterialIcons
            name="mail"
            size={50}
            color="#EF8D32"
            padding= "10"
          />
      </View>
    </TouchableHighlight>
  );
}

ViewEmailButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
