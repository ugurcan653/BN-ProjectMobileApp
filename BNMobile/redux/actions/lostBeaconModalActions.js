import * as actionTypes from './actionTypes'

export function lostBeaconModal(modal)
{
    return {
        type:actionTypes.LOSTBEACONMODAL,
        payload:modal
    }
}