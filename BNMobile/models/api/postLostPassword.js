import getConnectionLink from '../Connector'
import axios from 'axios';
var email="";
export default async function postLostPassword(paramsValues){
    var directory="lostpassword";
    var paramsNames=["email"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
        email=res.data;
     })
     .catch(error => {
     });
    return email;
 }