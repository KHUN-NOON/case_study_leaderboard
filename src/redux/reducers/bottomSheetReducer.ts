import bottomSheetActions from "../actions/bottomSheetActions"
import { ActionType } from "../actions/bottomSheetActions"

const initialState = {
    open: false
}

function bottomSheetReducer(state = initialState, action: bottomSheetActions) {
    const { type } = action
    
    switch (type) {
        case ActionType.BOTTOM_SHEET_CLOSE: {
            return {
                open: false
            }
        }
        case ActionType.BOTTOM_SHEET_OPEN: {
            return {
                open: true
            }
        }
        case ActionType.BOTTOM_SHEET_TOGGLE: {
            return {
                open: !state.open
            }
        }
        default: 
            return state
    }
}

export default bottomSheetReducer