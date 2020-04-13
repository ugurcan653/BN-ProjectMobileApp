import getConnectionLink from '../Connector'
import axios from 'axios';
var beacon="";
export default async function getBeaconDetailData(directory,paramsNames,paramsValues){
    var obj = getConnectionLink(directory,paramsNames,paramsValues,"GET")
    console.log("url "+obj)
    await axios.get(obj)
    .then((res) => {
      console.log("obje"+res.data)
      if(!res.data.error){
        beacon = res.data;
      }  
      else{
        alert(res.data.message);
      }
     })
     .catch(error => {
       console.log(error);
     });
    return beacon;
 }