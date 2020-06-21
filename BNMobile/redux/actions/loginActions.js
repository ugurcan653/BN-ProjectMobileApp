import * as actionTypes from "./actionTypes"
import postLogin from '../../models/api/postLogin';
import { Actions } from 'react-native-router-flux';
export function login(login)
{
    return {
        type:actionTypes.LOGIN,
        payload:login
    }
}
export function getToken(paramsValues)
{
    return function(dispatch){
        postLogin(paramsValues)
        .then((result)=>{
            dispatch(login(result))
            if(result!="")
            {
                Actions.replace("drawerMenu");
                Actions.Device();
            }
            else{
            }
        })
    }
}