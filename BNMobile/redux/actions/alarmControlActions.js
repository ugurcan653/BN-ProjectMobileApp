import * as actionTypes from "./actionTypes"
export function alarmControl(alarmControl)
{
    return {
        type:actionTypes.ALARMCONTROL,
        payload:alarmControl
    }
}