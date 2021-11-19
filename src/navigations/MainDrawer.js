import "react-native-gesture-handler";

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import { DrawerContent } from "../screens/DrawerContent";





import StockScreenIndex from "../screens/StockScreen/StockScreenIndex";
import { useSelector } from "react-redux";


const StockStack = createStackNavigator();
const StockStackScreen = ({ navigation }) => (
  <StockStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#000",
    }}
  >
    <StockStack.Screen
      name="Stocks"
      component={StockScreenIndex}
      options={{
        title: "Stocks",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </StockStack.Navigator>
);


const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    /*screenOptions={{
      headerStyle: {
        backgroundColor: "#5f3056",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerShown: false
    }}*/
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        elevation: 0,
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        // fontWeight: "200",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreenIndex}
      options={{
        title: "Profile",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);


const Drawer = createDrawerNavigator();
//définir les écrans aprés authentification 
const Index = () => {
  const authState = useSelector((state) => state.authState);
  return (
    
    <NavigationContainer>
    <Drawer.Navigator
      initialRouteName="Stocks"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      
     
      <Drawer.Screen name="Stock" component={StockScreenIndex} />
      <Drawer.Screen name="ProfileScreen" component={ProfileStackScreen} ></Drawer.Screen>
    
    </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Index;
