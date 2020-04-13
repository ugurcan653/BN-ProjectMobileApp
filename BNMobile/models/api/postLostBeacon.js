import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function postLostBeacon(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
          console.log("aha bu"+res)
          beacon=res.data.beacom;
     })
     .catch(error => {
       console.log(error);
     });
    return beacon;
 }