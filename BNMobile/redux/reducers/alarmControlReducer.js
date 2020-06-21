import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function alarmControlReducer(state=initialState.alarmControl,action)
{
    switch (action.type) {
        case actionTypes.ALARMCONTROL:
            return action.payload
        default:
            return state;
    }
}