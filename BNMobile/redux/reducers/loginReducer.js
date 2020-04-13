import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function loginReducer(state=initialState.login,action)
{
    switch (action.type) {
        case actionTypes.LOGIN:
            return action.payload
        default:
            return state;
    }
}