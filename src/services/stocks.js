import axios from "axios";
import _ from "lodash";
// appel au api getStock pour avoir les stock par magasins
export function getDataStock(params = {}, userToken = null) {
  var data = "";
  console.log("token: " + userToken);
  var config = {
    method: "get",
    url: "http://tfd-test-app.herokuapp.com/public/api/stock/getStock",
    headers: {
      Authorization: userToken,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
  };

  return axios(config);
}
//appel au api transformstock pour faire un transfert du stock d'un magasin à un autre 
export function updateStock(data,userToken){
  var data = JSON.stringify({magasin1:data.magasin1.value,magasin2:data.magasin2.value,fruit:data.fruit.value,nbretransorme:data.nbretransorme});
  console.log("token: " + data);
  var config = {
    method: "post",
    url: "http://tfd-test-app.herokuapp.com/public/api/stock/transformstock",
    headers: {
      Authorization: userToken,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    data:data
  };

  return axios(config);
}