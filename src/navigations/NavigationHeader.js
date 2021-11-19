import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider, FAB, Portal, Text, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { setTripDetailVisible } from "../store/realtime";
import { useDispatch } from "react-redux";
const NavigationHeader = (props) => {
  const navigation = useNavigation();
  const [state, setState] = React.useState({ open: false });
  const dispatch = useDispatch();
  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <View style={styles.container}>
      <FAB
        small
        style={{
          backgroundColor: "#fff",
          elevation: 6,
        }}
        icon="menu"
        onPress={() => {
          dispatch(setTripDetailVisible(false));
          navigation.openDrawer();
        }}
      />
      <View style={styles.label}>
        <Text style={{ color: "#fff" }}>{props.labelScreen}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute", //use absolute position to show button on top of the map
    alignItems: "center",
    top: 35,
    left: 10,
    elevation: 5,
  },
  label: {
    marginLeft: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 10,
  },
});
export default NavigationHeader;
