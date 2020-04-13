import getConnectionLink from '../Connector'
import axios from 'axios';
var lostBeacons=[];
export default async function getLostBeaconList(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    console.log("getLostBeaconList "+obj)
    await axios.get(obj)
    .then((res) => {
      if(!res.data.error){
        lostBeacons = JSON.parse(JSON.stringify(res.data.beacons));
      }  
      else{
        alert(res.data.message);
      }
     })
     .catch(error => {
       console.log(error);
     });
    return lostBeacons;
 }