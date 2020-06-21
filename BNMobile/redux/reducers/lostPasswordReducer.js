import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function lostPasswordReducer(state=initialState.lostPassword,action)
{
    switch (action.type) {
        case actionTypes.LOSTPASSWORD:
            return action.payload
        default:
            return state;
    }
}