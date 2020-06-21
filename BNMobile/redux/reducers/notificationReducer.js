import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function notificationReducer(state=initialState.notification,action)
{
    switch (action.type) {
        case actionTypes.NOTIFICATION:
            return action.payload
        default:
            return state;
    }
}