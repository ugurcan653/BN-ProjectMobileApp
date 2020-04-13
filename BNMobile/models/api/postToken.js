import getConnectionLink from '../Connector'
import axios from 'axios';
var profile="";
export default async function postToken(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
        console.log(res.data)
        profile=res.data;
     })
     .catch(error => {
       console.log(error);
     });
    return profile;
 }