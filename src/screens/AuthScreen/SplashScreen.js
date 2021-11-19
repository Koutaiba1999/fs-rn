import React from "react";

import { View } from "react-native-animatable";
import { theme } from "../../core/theme";
import { StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/plate-fruit-1640254.jpg")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 220,
    height: 110,
    marginBottom: 8,
  },
});
export default SplashScreen;
