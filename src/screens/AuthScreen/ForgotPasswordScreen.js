import React, { useState } from "react";
import { Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
//import Button from "../../components/Button";
import { Button } from "react-native-elements";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from "../../helpers/nameValidator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaView from 'react-native-safe-area-view';
import {
  TouchableOpacity,
 
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
const { height } = Dimensions.get("window");
const topRange = height - 50;
import WebView from "react-native-webview";
const ForgotPasswordScreen = ({ navigation }) => {
  const draggableRange = { top: topRange, bottom: topRange - 190 };
  const _draggedValue = new Animated.Value(0);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
  };

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  };
  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.tabBarContainer}>
        <Button
          onPress={() => navigation.navigate("LoginScreen")}
          icon={<Icon name="arrow-left" size={24} />}
          type="clear"
        />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.textHeader}> Réinstaller Mot de Passe </Text>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    position: "relative",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  Header: {
    // height: 80,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 22.6,
    // width: "100%",
    color: "#000",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
    height: height,
  },
  tabBarContainer: {
    backgroundColor: "white",
    height: 65,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft: 0,
    //justifyContent: "space-between",
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: "#ef4771",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default ForgotPasswordScreen;
