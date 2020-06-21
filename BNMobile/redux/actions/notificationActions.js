import * as actionTypes from "./actionTypes"
import postNotification from '../../models/api/postNotification';
export function notification(not)
{
    return {
        type:actionTypes.NOTIFICATION,
        payload:not
    }
}
export function getNotification(paramsValues)
{
    return function(dispatch){
        postNotification(paramsValues)
        .then((result)=>{
            dispatch(notification(result))
        })
    }
}