import * as actionTypes from "./actionTypes"
import postCheckLostDevice from '../../models/api/postCheckLostDevice';
export function checkLostDevice(lostDevice)
{
    return {
        type:actionTypes.CHECKLOSTDEVICE,
        payload:lostDevice
    }
}
export function setLostDevice(paramsValues)
{
    return function(dispatch){
        postCheckLostDevice(paramsValues)
        .then((result)=>{
            dispatch(checkLostDevice(result))
        })
    }
}