import * as actionTypes from "./actionTypes"
import getBeaconList from '../../models/api/getBeaconList';
export function beaconList(beacons)
{
    return {
        type:actionTypes.BEACONLIST,
        payload:beacons
    }
}
export function getBeacons(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        getBeaconList(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(beaconList(result))
        })
    }
}