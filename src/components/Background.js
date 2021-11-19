import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { theme } from "../core/theme";

const Background = ({ children }) => (
  <View style={styles.background}>
    <View style={styles.container}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    // padding: 20,
    width: "100%",
    // maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Background;
