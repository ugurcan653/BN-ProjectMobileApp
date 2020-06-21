import * as actionTypes from "./actionTypes"
export function logout(logout)
{
    return {
        type:actionTypes.LOGOUT,
        payload:logout
    }
}