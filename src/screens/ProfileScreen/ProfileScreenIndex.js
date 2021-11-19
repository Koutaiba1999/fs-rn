import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const ProfileScreenIndex = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <View styles={styles.avatar}>
          <Avatar.Text size={100} label="XD" />
        </View>
      </View>
      <Text>Profile screen</Text>
    </View>
  );
};

export default ProfileScreenIndex;

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:"row",
    backgroundColor: "#fff",
    padding: 20,
  },
  avatar: {
    flexGrow:1,
    alignItems:"center",
    height: 200,
  },
});
