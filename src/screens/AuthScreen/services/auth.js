import axios from "axios";
import _ from "lodash";


//cette fonction permet de créer un token lorsque l'utilisateur se connect
export function retrieveToken(data) {
  var data = JSON.stringify({ email: data.email, password: data.password });

  var config = {
    method: "post",
    url: "http://tfd-test-app.herokuapp.com/public/api/auth/login",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config)
   
}
// appel a l'api register pour créer du nouveau compte
export function registerUser(data){
  var data2 = JSON.stringify({ email: data.email,name:data.name ,password: data.password });
  console.log(data2)
  var config = {
    method: "post",
    url: "https://tfd-test-app.herokuapp.com/public/api/auth/register",
    headers: {
      
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    data: data2,
  };
  return axios(config)
    
}
//cette fonction pour avoir les détails d'un utilisateur via un token 
export function getMember(params = {}, userToken) {
  let defaultParams = {};
  var config = {
    method: "post",
    url: "https://tfd-test-app.herokuapp.com/public/api/auth/me",
    headers: {
      'Authorization':userToken,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    //data: data,
  };
  return axios(config);
}
