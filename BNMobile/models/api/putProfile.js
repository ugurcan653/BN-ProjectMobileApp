import getConnectionLink from '../Connector'
import axios from 'axios';
var profile="";
export default async function putBeacon(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"PUT")
    console.log(obj)
    await axios.put(obj.url,obj.data)
    .then((res) => {
        console.log(res.data)
        profile=res.data;
     })
     .catch(error => {
       console.log(error);
     });
    return beacon;
 }