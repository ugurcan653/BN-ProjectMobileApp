import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function putBeacon(paramsValues){
    var directory="updatedevice";
    var paramsNames=["name", "variance", "img", "imgDesc", "beaconID"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"PUT")
    await axios.put(obj.url,obj.data)
    .then((res) => {
        beacon=res.data;
     })
     .catch(error => {
     });
    return beacon;
 }