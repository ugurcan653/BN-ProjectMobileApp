import * as actionTypes from "./actionTypes"
import postLostBeacon from '../../models/api/postLostBeacon';
export function addLostBeacon(beacon)
{
    return {
        type:actionTypes.ADDLOSTBEACON,
        payload:beacon
    }
}
export function setLostBeacon(paramsValues)
{
    return function(dispatch){
        postLostBeacon(paramsValues)
        .then((result)=>{
            dispatch(addLostBeacon(result))
        })
    }
}