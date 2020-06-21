import getConnectionLink from '../Connector'
import axios from 'axios';
var password="";
export default async function putPassword(paramsValues){
    var directory="changepassword";
    var paramsNames=["oldPass","newPass","newPassAgain","id"];
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"PUT")
    await axios.put(obj.url,obj.data)
    .then((res) => {
        password=res.data;
     })
     .catch(error => {
     });
    return password;
 }