import * as actionTypes from "./actionTypes"
import getBeaconDetailData from '../../models/api/getBeaconDetailData';
export function beaconDetailList(beacon)
{
    return {
        type:actionTypes.BEACONDETAIL,
        payload:beacon
    }
}
export function getBeaconDetail(paramsValues,classData)
{
    return function(dispatch){
        getBeaconDetailData(paramsValues)
        .then((result)=>{
            dispatch(beaconDetailList(result))
            classData.setState({
                name:result.beacon_name,
                type:result.type,
                variance:result.variance,
                image:result.img,
                uuid:result.uuid,
                spinner:true
            })
        })
    }
}