import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function beaconDetailReducer(state=initialState.beaconDetail,action)
{
    switch (action.type) {
        case actionTypes.BEACONDETAIL:
            return action.payload
        default:
            return state;
    }
}