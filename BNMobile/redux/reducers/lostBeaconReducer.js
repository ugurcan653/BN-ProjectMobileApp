import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function lostBeaconReducer(state=initialState.lostBeacon,action)
{
    switch (action.type) {
        case actionTypes.ADDLOSTBEACON:
            return action.payload
        default:
            return state;
    }
}