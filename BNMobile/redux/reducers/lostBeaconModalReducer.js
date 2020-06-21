import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function lostBeaconModalReducer(state=initialState.lostBeaconModal,action)
{
    switch (action.type) {
        case actionTypes.LOSTBEACONMODAL:
            return action.payload
        default:
            return state;
    }
}