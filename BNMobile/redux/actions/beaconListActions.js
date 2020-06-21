import * as actionTypes from "./actionTypes"
import getBeaconList from '../../models/api/getBeaconList';
export function beaconList(beacons)
{
    return {
        type:actionTypes.BEACONLIST,
        payload:beacons
    }
}
export function getBeacons(paramsValues)
{
    return function(dispatch){
        getBeaconList(paramsValues)
        .then((result)=>{
            dispatch(beaconList(result))
        })
    }
}