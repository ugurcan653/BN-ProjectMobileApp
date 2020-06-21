import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function profileReducer2(state=initialState.profile2,action)
{
    switch (action.type) {
        case actionTypes.PROFILE2:
            return action.payload
        default:
            return state;
    }
}