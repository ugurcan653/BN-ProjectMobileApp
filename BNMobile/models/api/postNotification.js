import getConnectionLink from '../Connector'
import axios from 'axios';
var notification="";
export default async function postNotification(paramsValues){
    var directory="mynotifications";
    var paramsNames=["userId"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
    await axios.post(obj.url,obj.data)
    .then((res) => {
        notification=res.data;
     })
     .catch(error => {
     });
    return notification;
 }