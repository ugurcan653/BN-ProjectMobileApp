import * as actionTypes from "./actionTypes"
import getLostBeaconList from '../../models/api/getLostBeaconList';
export function lostBeaconList(beacons)
{
    return {
        type:actionTypes.LOSTBEACONLIST,
        payload:beacons
    }
}
export function getLostBeacons(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        getLostBeaconList(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(lostBeaconList(result))
        })
    }
}