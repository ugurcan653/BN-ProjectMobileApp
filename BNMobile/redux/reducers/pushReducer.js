import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function pushReducer(state=initialState.push,action)
{
    switch (action.type) {
        case actionTypes.PUSH:
            return action.payload
        default:
            return state;
    }
}