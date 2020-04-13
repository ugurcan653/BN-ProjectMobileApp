import getConnectionLink from '../Connector'
import axios from 'axios';
var beacons=[];
export default async function getBeaconList(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    console.log("getbeaconlist "+obj)
    await axios.get(obj)
    .then((res) => {
      if(!res.data.error){
        beacons = res.data.beacons;
      }  
      else{
        alert(res.data.message);
      }
     })
     .catch(error => {
       console.log(error);
     });
    return beacons;
 }