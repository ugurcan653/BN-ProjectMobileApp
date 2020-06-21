import getConnectionLink from '../Connector'
import axios from 'axios';
import { Alert } from "react-native";
var beacons=[];
export default async function getBeaconList(paramsValues){
    var directory="devices";
    var paramsNames=["userId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    await axios.get(obj)
    .then((res) => {
      if(!res.data.error){
        beacons = res.data.beacons;
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
    return beacons;
 }