import * as actionTypes from "./actionTypes"
import putPassword from '../../models/api/putPassword';
export function changePassword(pass)
{
    return {
        type:actionTypes.CHANGEPASSWORD,
        payload:pass
    }
}
export function setPassword(paramsValues)
{
    return function(dispatch){
        putPassword(paramsValues)
        .then((result)=>{
        })
    }
}