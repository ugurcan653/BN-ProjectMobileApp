import * as actionTypes from "./actionTypes"
export function beaconRange(range)
{
    return {
        type:actionTypes.BEACONRANGE,
        payload:range
    }
}