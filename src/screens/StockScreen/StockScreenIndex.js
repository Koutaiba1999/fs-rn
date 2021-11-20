import React, { useEffect,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Title, Text, FAB } from "react-native-paper";

import { getDataStock } from "../../services/stocks";

import { setistrans, setStockData } from "../../store/stocks";
import _ from "lodash";
import moment from "moment";

moment.locale("fr");

import { ScrollView } from "react-native-gesture-handler";
import StockTransfert from "./components/Modals/StockTransfert";
import { logout } from "../../store/auth";
import { AuthContext } from "../../helpers/context";
// écran pour afficher le stocke et faire des transferts 
const StockScreenIndex = (props) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authState);
  const stockState = useSelector((state) => state.stockState);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { signOut } = useContext(AuthContext);
  // on récupère le stock par magasin lorsque l'écran stock s'affiche
  useEffect(() => {
    const member = authState.member;
    const userToken = authState.userToken;

    setTimeout(
      () => {
        getDataStock({}, userToken)
          .then(async (response) => {
            console.log(response.data);

            dispatch(setStockData(response.data.stock));
          })
          .catch((error) => {
            if(error.response.data.message == "Unauthenticated."){
              Alert.alert("votre token est expiré.Cliquer OK pour se reconnecter");
              signOut()
            };
          });
      },
      500,
      member,
      userToken
    );
    console.log(authState.member);
  }, []);
  //cette fonction retourne le total des stocks
  const totalStock = (item) => {
    var i;
    var sum = 0;
    for (i = 0; i < item.stock.length; i++) {
      sum += item.stock[i].value;
    }
    return sum;
  };
  // affiche le button pour le formulaire du transfert du stock
  const transformbutton = () => {
    return (
      <FAB.Group
        style={{ elevation: 5, position: "absolute" }}
        open={open}
        color={"white"}
        fabStyle={{ backgroundColor: "#5f3056", elevation: 0 }}
        icon={"plus"}
        actions={[
          {
            icon: "plus",
            // label: "Par véhicule",
            onPress: () => {
              dispatch(setistrans(true));
            },
          },
        ]}
        onStateChange={onStateChange}
      />
    );
  };

  // si le stock est vide alors pas du stock si non off afiche les stocks par magasin
  if (stockState.stocks) {
    if (stockState.stocks.length === 0) {
      return (
        <View style={styles.centerBox}>
          <Text>Pas de Stock</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView style={{ flex: 1, padding: 15 }}>
            {stockState.stocks.map((item, index) => (
              <Card
                key={index}
                style={{
                  elevation: 0,
                  borderWidth: 0.4,
                  borderColor: "#ccc",
                  marginBottom: 15,
                }}
              >
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Title>{"Magasin " + item.magasin}</Title>
                  </View>
                  <View>
                    {item.stock
                      ? item.stock.map((itm, i) => (
                          <View key={i}>
                            <Text>
                              Stock en {itm.key} : {itm.value}
                            </Text>
                          </View>
                        ))
                      : null}
                  </View>
                  <Text style={{ fontWeight: "bold" }}>
                    {"Stock total des fruits: " + totalStock(item).toString()}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          {transformbutton()}

          <StockTransfert></StockTransfert>
        </View>
      );
    }
  } else return null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  roleBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 3,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default StockScreenIndex;
