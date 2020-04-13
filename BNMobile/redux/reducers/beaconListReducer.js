import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function loginReducer(state=initialState.beacons,action)
{
    switch (action.type) {
        case actionTypes.BEACONLIST:
            return action.payload
        default:
            return state;
    }
}