import { ThunkDispatch } from "redux-thunk"
import { Action } from "redux"
import { RootState } from "../store"
import { ActionType } from "../actions/bottomSheetActions"

export function bottomSheetToggleThunk() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        dispatch({
            type: ActionType.BOTTOM_SHEET_TOGGLE
        })
    }
}

export function bottomSheetOpenThunk() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        dispatch({
            type: ActionType.BOTTOM_SHEET_OPEN
        })
    }
}

export function bottomSheetCloseThunk() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        dispatch({
            type: ActionType.BOTTOM_SHEET_CLOSE
        })
    }
}