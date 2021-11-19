import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function Loader(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    elevation:20,
    width:50,
    height:50
  },
});
