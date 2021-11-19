import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ModalAdd from "./Modals/ModalAdd";
import { View, Dimensions, StyleSheet, ScrollView, Text } from "react-native";
import _ from "lodash";

const { height } = Dimensions.get("window");

import { theme } from "../../../../core/theme.js";

import { SwipeablePanel } from "rn-swipeable-panel";

import { setistrans } from "../../../../store/stocks";

export default function StockTransfert({}) {
  const dispatch = useDispatch();

  const stockState = useSelector((state) => state.stockState);

  const authState = useSelector((state) => state.authState);

  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    // onlySmall:true,
    showCloseButton: true,
    noBackgroundOpacity: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });

  const openPanel = () => {
    dispatch(setistrans(true));
  };

  const closePanel = () => {
    dispatch(setistrans(false));
  };

  return (
    <SwipeablePanel
      {...panelProps}
      isActive={stockState.istrans}
      style={{ height: "65%" }}
    >
      <View style={styles.container}>
        <ScrollView style={{ height }} nestedScrollEnabled={true}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.addexpense}>{"transférer du stock"}</Text>
          </View>
          <View style={{ height: "100%", marginTop: 30, marginBottom: 30 }}>
            <ModalAdd />
          </View>
        </ScrollView>
      </View>
    </SwipeablePanel>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //marginTop: 10,
    //flex: 1,
    //justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 20,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  touchElement: {
    position: "absolute",
    top: -15,
  },
  addexpense: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 3,
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 0.8,
    borderTopColor: "#e1e1e1",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 13.97,

    elevation: 21,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  panelHeader: {
    // height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    //borderRadius: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 17,
    //flex: 1,
    flexWrap: "wrap",
    // marginBottom:0.1,
    paddingRight: 5,
    color: "#2a3d48",
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 22.6,
    // width: "100%",
    textAlign: "center",
    color: "#000",
  },
  panelBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    marginLeft: 10,
    fontSize: 22.6,
    // width: "100%",
    color: "#000",
  },
});
