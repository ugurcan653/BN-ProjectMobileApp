import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'
export default function profileEditReducer(state=initialState.profileEdit,action)
{
    switch (action.type) {
        case actionTypes.PROFILEEDIT:
            return action.payload
        default:
            return state;
    }
}