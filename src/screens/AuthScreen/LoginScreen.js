import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Animated,
  
} from "react-native";

import { Text } from "react-native-paper";
import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../helpers/authValidator";

import { retrieveToken, getMember } from "./services/auth";

import { AuthContext } from "../../helpers/context";
import SlidingUpPanel from "rn-sliding-up-panel";

const { height } = Dimensions.get("window");
const topRange = height - 50;

import { Alert } from "react-native";
const LoginScreen = ({ navigation }) => {
  const draggableRange = { top: topRange, bottom: topRange / 1.618 };
  const _draggedValue = new Animated.Value(0);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  

  const onLoginPressed = () => {
    setLoading(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      return;
    }
    console.log('test from login'+email.value+ " "+ password.value)
    retrieveToken({ email: email.value, password: password.value })
      .then((response) => {
        console.log(response.data)
       let data = response.data;
      let userToken = data.token_type + " " + data.access_token;
        
        getMember({}, userToken)
          .then((response) => {
            let member = response.data;
            //console.log(response.data)
            signIn(userToken, member);
          })
          .catch((error) => {
            Alert.alert(error)
            setMessage("Membre introuvable");
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            Alert.alert("error", error.response);
          });
      })
      .catch((error) => {
        
        setEmail({ ...email, error: " " });
        setPassword({ ...password, error: " " });
        setMessage("les informations d'identification invalides");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
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
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.forgot}>Mot de passe oublié?</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.message}>{message}</Text>
          </View>
          <Button mode="contained" loading={loading} onPress={onLoginPressed}>
            S'identifier
          </Button>
          <View style={styles.row}>
            <Text>Vous n’avez pas de compte? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.link}>S'inscrire</Text>
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

export default LoginScreen;
