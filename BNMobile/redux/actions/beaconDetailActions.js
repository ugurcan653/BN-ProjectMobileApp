import * as actionTypes from "./actionTypes"
import getBeaconDetailData from '../../models/api/getBeaconDetailData';
export function beaconDetailList(beacon)
{
    return {
        type:actionTypes.BEACONDETAIL,
        payload:beacon
    }
}
export function getBeaconDetail(directory,paramsNames,paramsValues)
{
    return function(dispatch){
        getBeaconDetailData(directory,paramsNames,paramsValues)
        .then((result)=>{
            dispatch(beaconDetailList(result))
        })
    }
}