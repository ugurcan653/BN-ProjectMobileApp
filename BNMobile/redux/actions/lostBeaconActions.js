import * as actionTypes from "./actionTypes"
import postLostBeacon from '../../models/api/postLostBeacon';
export function addLostBeacon(beacon)
{
    return {
        type:actionTypes.ADDLOSTBEACON,
        payload:beacon
    }
}
export function setLostBeacon(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        postLostBeacon(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(addLostBeacon(result))
            console.log(result);
        })
    }
}