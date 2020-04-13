import * as actionTypes from "./actionTypes"
import putProfile from '../../models/api/putProfile';
export function profileEdit(profile)
{
    return {
        type:actionTypes.PROFILEEDIT,
        payload:profile
    }
}
export function putProfileEdit(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        putProfile(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(profileEdit(result))
        })
    }
}