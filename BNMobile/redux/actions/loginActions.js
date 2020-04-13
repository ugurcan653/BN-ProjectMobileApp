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
export function getToken(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        postLogin(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(login(result))
            console.log(result);
            Actions.drawerMenu();
            Actions.Device();
        })
    }
}