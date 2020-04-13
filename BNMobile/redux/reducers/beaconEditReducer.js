import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function beaconEditReducer(state=initialState.beaconEdit,action)
{
    switch (action.type) {
        case actionTypes.BEACONEDIT:
            return action.payload
        default:
            return state;
    }
}