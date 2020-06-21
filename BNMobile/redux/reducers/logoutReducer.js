import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function logoutReducer(state=initialState.logout,action)
{
    switch (action.type) {
        case actionTypes.LOGOUT:
            return action.payload
        default:
            return state;
    }
}