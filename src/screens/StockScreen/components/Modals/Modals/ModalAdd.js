import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { Formik } from "formik";

import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import DropDownPicker from "react-native-dropdown-picker";

import {
  setistrans,
  setmodalLoading,
  setStockData,
} from "../../../../../store/stocks";
import { getDataStock, updateStock } from "../../../../../services/stocks";
// c'est le modal pour faire de transfert du stock 
export default function ModalAdd({  }) {
  const state = useSelector((state) => state.stockState);
  const dispatch = useDispatch();

  const [fruit, setfruit] = useState(null);
  const [magasin1, setmagasin1] = useState(null);
  const [magasin2, setmagasin2] = useState(null);

  const authState = useSelector((state) => state.authState);

  const [magasins, setstates] = useState([
    { id: "1", label: "Paris", value: "Paris" },
    { id: "2", label: "Marseille", value: "Marseille" },
    { id: "3", label: "Lille", value: "Lille" },
    { id: "4", label: "Dijon", value: "Dijon" },
    { id: "5", label: "Nice", value: "Nice" },
  ]);
  const [fruits, setstates2] = useState([
    { id: "1", label: "Orange", value: "Orange" },
    { id: "2", label: "Pomme", value: "Pomme" },
    { id: "3", label: "Cerise", value: "Cerise" },
    { id: "4", label: "Banane", value: "Banane" },
    { id: "5", label: "Fraise", value: "Fraise" },
  ]);
  // cette fonction est  utilisé pour la mise à jour de stock 
  const getAlltheStock = ()=>{
    getDataStock({}, authState.userToken).then((response) => {
      console.log(response.data);
      dispatch(setStockData(response.data.stock));
      dispatch(setistrans(false));
      
    }).catch((error) => {
      console.log(error.response);
    });
  }
  //cette fonction permet de tranférer de fruit
  const updatefruitstoc = (data) => {
    updateStock(data, authState.userToken)
      .then((response) => {
        console.log("response", response.data);
        dispatch(setmodalLoading(false));
        getAlltheStock();
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <Formik
      initialValues={{
        nbretransorme: "",
      }}
      onSubmit={(values) => {
        dispatch(setmodalLoading(true));
        var data = {
          magasin1: magasin1,
          magasin2: magasin2,
          fruit: fruit,
          nbretransorme: parseInt(values.nbretransorme),
        };
        updatefruitstoc(data);
      }}
      //validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Magasin de départ:
          </Text>
          <View>
            <DropDownPicker
              items={magasins}
              defaultValue={null}
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setmagasin1(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Magasin d'arrivé:
          </Text>
          <View>
            <DropDownPicker
              items={magasins}
              defaultValue={null}
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setmagasin2(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginTop: 3,
              width: 300,
              marginLeft: 5,
            }}
          >
            Fruit à transférer:
          </Text>
          <View>
            <DropDownPicker
              items={fruits}
              defaultValue={null}
             
              containerStyle={{ height: 45 }}
              style={{ backgroundColor: "#F3F3F3", width: 300 }}
              itemStyle={{
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
              dropDownStyle={{
                backgroundColor: "#fff",
                marginTop: 2,
              }}
              onChangeItem={(item) => {
                
                setfruit(item);
                
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: 5,
              marginTop: 3,
            }}
          >
            Nombre de fruit à transférer:
          </Text>
          <TextInput
            placeholder="Nombre de fruit"
            style={StyledInput.formInput}
            onChangeText={handleChange("nbretransorme")}
            value={values.nbretransorme}
          ></TextInput>

          <View style={{ alignItems: "center", marginTop: 70 }}>
            <Button
              mode="contained"
              loading={state.modalLoading}
              onPress={handleSubmit}
            >
              {"Transférer"}
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}
const StyledInput = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TO_Date_AdvancedResearch: {
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    height: 45,
    paddingLeft: 15,
    flexDirection: "row",
    width: 300,
  },
  validationText: {
    marginTop: 8,
    marginBottom: 8,
    color: "red",
  },
  formInput: {
    width: 300,
    height: 45,
    
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#F3F3F3",
  },
});
