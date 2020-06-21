import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function postLostBeacon(paramsValues){
    var directory="addlostdevice";
    var paramsNames=["phone","email","creditCardNo","creditCardFullName","creditCardExDate","cvv","lastSeen","lostLat","lostLong","beaconID","lostDesc"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          beacon=res.data;
     })
     .catch(error => {
     });
    return beacon;
 }