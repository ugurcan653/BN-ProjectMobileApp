import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function beaconRangeReducer(state=initialState.beaconRange,action)
{
    switch (action.type) {
        case actionTypes.BEACONRANGE:
            return action.payload
        default:
            return state;
    }
}