import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import {
  Avatar,
 
  Drawer,
  Text,
  
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../helpers/context";
import { useSelector, useDispatch } from "react-redux";


// ecran pour navigation lorsque on connecte 
export function DrawerContent(props) {
  const authState = useSelector((state) => state.authState);
  const { signOut } = useContext(AuthContext);
  const dispatch = useDispatch();
 
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawercontent}>
          <Drawer.Section style={styles.drawerSection}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Avatar.Text size={36} label={authState.member.name} />
              </View>
              <View>
                <Text style={{ fontSize: 20 }}>
                  {authState.member.name}
                </Text>
              </View>
            </View>

            
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
       
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="office-building" color={color} size={size} />
          )}
          label="Stocks"
          style={{ color: "red" }}
          onPress={() => {
            props.navigation.navigate("Stocks");
            
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Déconnexion"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    // fontWeight: "500",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  TopDrawerSection: {
    marginBottom: 12,
    marginTop: 9,
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  logo: {
    width: 200,
    height: 100,
    flex: 1,
    //borderRadius:40,
    //borderWidth:40,
  },
});
