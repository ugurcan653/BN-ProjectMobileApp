import getConnectionLink from '../Connector'
import axios from 'axios';
var device="";
export default async function postCheckLostDevice(paramsValues){
    var directory="checklostdevice";
    var paramsNames=["uuid"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          device=res.data;
     })
     .catch(error => {
     });
    return device;
 }