import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function checkLostDeviceReducer(state=initialState.checkLostDevice,action)
{
    switch (action.type) {
        case actionTypes.CHECKLOSTDEVICE:
            return action.payload
        default:
            return state;
    }
}