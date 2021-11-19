import React from "react";
import { View } from "react-native";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  
    <Image
      source={require("../assets/plate-fruit-1640254.jpg")}
      style={styles.image}
    />
  
);

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 110,
    marginVertical: 100,

  },
  dot: {
    height: 120,
    width: 120,
    backgroundColor:"#fff",
    borderRadius:60,
    justifyContent: "center",
    alignItems: "center",
    
    //bord: "50%",
    //display: inline-block,
  }
});

export default Logo;
