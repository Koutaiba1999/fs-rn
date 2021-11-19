import React, { useState } from "react";
import { Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
//import Button from "../../components/Button";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import BackButton from "../../components/BackButton";
import { theme } from "../../core/theme";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from "../../helpers/nameValidator";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SafeAreaView from "react-native-safe-area-view";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Animated,
  Alert,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
const { height } = Dimensions.get("window");
const topRange = height - 50;
import WebView from "react-native-webview";
import { registerUser } from "./services/auth";

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const draggableRange = { top: topRange, bottom: topRange - 190 };
  const _draggedValue = new Animated.Value(0);
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [erroremail, setErroremail] = useState([]);
  const [errorname, setErrorname] = useState([]);
  const [errorpassword, setErrorpassword] = useState([]);
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      var data = {
        email: email.value,
        name: name.value,
        password: password.value,
      };
      setLoading(true);
      registerUser(data)
        .then((response) => {
          console.log(response);
          setLoading(false);
          Alert.alert("compte crée, vous pouvez maintenant connecter");
          navigation.navigate("LoginScreen");
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.data.errors.name) {
            setErrorname(error.response.data.errors.name);
          }
          if (error.response.data.errors.email) {
            setErroremail(error.response.data.errors.email);
          }
          if (error.response.data.errors.password) {
            setErrorpassword(error.response.data.errors.password);
          }
        });
    }
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
    <Background>
      <Logo />
      <SlidingUpPanel
        draggableRange={draggableRange}
        animatedValue={_draggedValue}
        snappingPoints={[360]}
        height={topRange}
        friction={0.5}
        backdropOpacity={0}
      >
        <View style={styles.panel}>
          <Header>Bienvenue.</Header>
          <TextInput
            label="Nom"
            dense={true}
            returnKeyType="done"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: "" })}
            error={!!name.error}
            errorText={name.error}
          />
          {errorname.length > 0
            ? errorname.map((item, index) => (
                <View key={index}>
                  <Text style={styles.message}>{item}</Text>
                </View>
              ))
            : null}
          <TextInput
            label="Email"
            dense={true}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          {erroremail.length > 0
            ? erroremail.map((item, index) => (
                <View key={index}>
                  <Text style={styles.message}>{item}</Text>
                </View>
              ))
            : null}
          <TextInput
            label="Mot de passe"
            dense={true}
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          {errorpassword.length > 0
            ? errorpassword.map((item, index) => (
                <View key={index}>
                  <Text style={styles.message}>{item}</Text>
                </View>
              ))
            : null}

          <Button mode="contained" loading={loading} onPress={onSignUpPressed}>
            S'inscrire
          </Button>
          <View style={styles.row}>
            <Text>Vous avez de compte? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.link}>S'identifier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SlidingUpPanel>
    </Background>
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
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  message: {
    fontSize: 13,
    color: theme.colors.error,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RegisterScreen;
