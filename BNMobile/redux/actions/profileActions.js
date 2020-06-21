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
export function getProfile(paramsValues)
{
    return function(dispatch){
        postToken(paramsValues)
        .then((result)=>{
            dispatch(profile(result))
        })
    }
}