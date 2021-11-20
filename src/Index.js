import React, { useState, useEffect, useMemo, useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import MainDrawer from "./navigations/MainDrawer";
import SplashScreen from "./screens/AuthScreen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./core/theme";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from "./screens/AuthScreen";

import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "./helpers/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { retrieveData, login, logout } from "./store/auth";
import { setStockData } from "./store/stocks";

const Stack = createStackNavigator();

const App = () => {
  const authState = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  // cette fonction permet de sauvegarder l'utilisateur si il connecte ou le supprime si il déconnecte
  const authContext = useMemo(
    () => ({
      signIn: async (userToken, member) => {
        try {
          await AsyncStorage.setItem("userToken", userToken);
          const memberValue = JSON.stringify(member);
          await AsyncStorage.setItem("member", memberValue);
        } catch (e) {}
        dispatch(login(userToken, member));
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("member");
        } catch (e) {}
        await dispatch(logout());
        await dispatch(setStockData([]));
      },
      signUp: () => {},
      // toggleTheme: () => {
      //   setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      // },
    }),
    []
  );
//useeffect pour voir si on a un utilisateur connecter ou non 
  useEffect(() => {
    setTimeout(async () => {
      let member = null;
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        member = await AsyncStorage.getItem("member");
      } catch (e) {}
      member = JSON.parse(member);
      let data = { userToken, member };
      dispatch(retrieveData(data));
    }, 1000);
  }, []);
  if (authState.isLoading) {
    return <SplashScreen />;
  }
//retourner les écrans selon l'etat d utilisateur connecté ou non 
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        {authState.userToken === null ? (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="LoginScreen"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        ) : (
          <MainDrawer />
        )}
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
