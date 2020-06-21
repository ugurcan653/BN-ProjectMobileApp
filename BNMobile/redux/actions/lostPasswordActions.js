import * as actionTypes from "./actionTypes"
import postLostPassword from '../../models/api/postLostPassword';
export function lostPassword(email)
{
    return {
        type:actionTypes.LOSTPASSWORD,
        payload:email
    }
}
export function getlostPassword(paramsValues)
{
    return function(dispatch){
        postLostPassword(paramsValues)
        .then((result)=>{
            dispatch(lostPassword(result))
        })
    }
}