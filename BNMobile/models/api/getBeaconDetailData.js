import getConnectionLink from '../Connector'
import axios from 'axios';
import { Alert } from "react-native";
var beacon="";
export default async function getBeaconDetailData(paramsValues){
    var directory="devicedetail";
    var paramsNames=["deviceId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    await axios.get(obj)
    .then((res) => {
      if(!res.data.error){
        beacon = res.data;
      }  
      else{
        Alert.alert(
          "Hata!",
        "Bir şeyler ters gitti!",
        [
          { text: "Tamam"}
        ],
        { cancelable: false }
      );
      }
     })
     .catch(error => {
     });
    return beacon;
 }