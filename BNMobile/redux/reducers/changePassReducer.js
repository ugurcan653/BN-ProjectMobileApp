import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function changePassReducer(state=initialState.password,action)
{
    switch (action.type) {
        case actionTypes.CHANGEPASSWORD:
            return action.payload
        default:
            return state;
    }
}