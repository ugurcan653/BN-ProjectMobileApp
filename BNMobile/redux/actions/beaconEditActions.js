import * as actionTypes from "./actionTypes"
import putBeacon from '../../models/api/putBeacon';
export function beaconEdit(beacon)
{
    return {
        type:actionTypes.BEACONEDIT,
        payload:beacon
    }
}
export function putBeaconEdit(paramsValues)
{
    return function(dispatch){
        putBeacon(paramsValues)
        .then((result)=>{
            dispatch(beaconEdit(result))
        })
    }
}