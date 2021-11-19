import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Icon name="arrow-left" size={28} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default BackButton;
