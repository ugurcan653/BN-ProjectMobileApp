import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function loginReducer(state=initialState.lostBeacons,action)
{
    switch (action.type) {
        case actionTypes.LOSTBEACONLIST:
            return action.payload
        default:
            return state;
    }
}