import getConnectionLink from '../Connector'
import axios from 'axios';
var profile="";
export default async function postToken(paramsValues){
    var directory="profile";
    paramsValues.push("mobil")
    var paramsNames=["token","tokenType"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
        profile=res.data;
     })
     .catch(error => {
     });
    return profile;
 }