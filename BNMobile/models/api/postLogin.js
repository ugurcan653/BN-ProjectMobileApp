import getConnectionLink from '../Connector'
import axios from 'axios';
import { Alert } from "react-native";
var login="";
export default async function postLogin(paramsValues){
    var directory="login";
    paramsValues.push("mobil")
    var paramsNames=["email","password","pushId","loginType"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
        if(!res.data.error)
        {
            login=res.data.user_token;
        }
        else{
            Alert.alert(
                "Hata!",
              "Kullanıcı adı veya şifre hatalı!",
              [
                { text: "Tamam"}
              ],
              { cancelable: false }
            );
        }
     })
     .catch(error => {
     });
    return login;
 }