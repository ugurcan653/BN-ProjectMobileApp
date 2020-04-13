import * as actionTypes from "./actionTypes"
import putBeacon from '../../models/api/putBeacon';
export function beaconEdit(beacon)
{
    return {
        type:actionTypes.BEACONEDIT,
        payload:beacon
    }
}
export function putBeaconEdit(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        putBeacon(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(beaconEdit(result))
        })
    }
}