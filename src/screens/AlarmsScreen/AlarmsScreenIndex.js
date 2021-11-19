import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { check_redux } from "./store/Reducer";

const AlarmsScreenIndex = (props) => {
  const data = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="check" onPress={() => dispatch(check_redux())}></Button>
      <Text>{data}</Text>
    </View>
  );
};

export default AlarmsScreenIndex;
