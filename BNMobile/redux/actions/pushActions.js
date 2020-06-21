import * as actionTypes from "./actionTypes"
export function push(pushNotification)
{
    return {
        type:actionTypes.PUSH,
        payload:pushNotification
    }
}