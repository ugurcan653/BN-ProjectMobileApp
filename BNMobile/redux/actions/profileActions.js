import * as actionTypes from "./actionTypes"
import postToken from '../../models/api/postToken';
import { Actions } from 'react-native-router-flux';
export function profile(profile)
{
    return {
        type:actionTypes.PROFILE,
        payload:profile
    }
}
export function getProfile(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        postToken(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(profile(result))
            console.log(result);
        })
    }
}