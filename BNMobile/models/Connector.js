//const url = "http://192.168.1.23:8090";
const url ="http://92.44.120.164:8090";
import Beacon from './Beacon'
import axios from 'axios';
var beacons=[]
export default function getConnectionLink(directory, paramsNames, paramsValues,requestType){
    var link = url + "/" + directory;
    if(requestType.toUpperCase() == "GET"){
        if(paramsNames.length == paramsValues.length && (paramsNames[0]!="" && paramsNames.length!=0)){
            link += "?";
            paramsNames.forEach((element,index) => {
                link += element + "=" + paramsValues[index] + "&";
            });
            return link;
        }
        else if(paramsNames.length != paramsValues.length){
            throw "Parametrelerin isim ve değer sayısı eşit değil.";
        }
        else{
            return link;
        }
    }
    else if (requestType.toUpperCase()=="POST" || requestType.toUpperCase()=="PUT"){
        if(paramsNames.length == paramsValues.length && (paramsNames[0]!="" || paramsNames.length!=0)){
            var formData= new FormData();
            paramsNames.forEach((element,index) => {
                formData.append(element, paramsValues[index])
            });
            var obj = {
                url:link,
                data:formData,
            }
            return obj;
        }
        else if(paramsNames.length != paramsValues.length){
            throw "Parametrelerin isim ve değer sayısı eşit değil.";
        }
        else{
            throw "Parametreler POST methodunda boş bırakılamaz."; 
        }
    }
}
    export function getBeacon(directory="updatedevice",paramsNames=[""],paramsValues=[""]){
    //axios işlemleri
    /*
        body = new FormData();
        body.set('name',value);
    */
   var obj = getConnectionLink(directory,paramsNames,paramsValues,"POST")
   axios.post(obj.url,obj.data)
   .then(function(res){console.log(res.data.message)})
   .then(result => {
       var temp = new Beacon()
       for(var i=0;i<result.length;i++){
           console.log("result bu "+result)
           temp.uuid=result[i].uuid;
           temp.lat=result[i].lat;
           temp.long=result[i].long;
           beacons.push(temp);
       }
       console.log("beacons bu "+beacons);
   })
    .catch(error => {
      console.log(error);
    });
    return beacons;
}