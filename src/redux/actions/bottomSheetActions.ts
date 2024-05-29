export enum ActionType {
    BOTTOM_SHEET_OPEN = 'bottom_sheet/open',
    BOTTOM_SHEET_CLOSE = 'bottom_sheet/close',
    BOTTOM_SHEET_TOGGLE = 'bottom_sheet/toggle'
}

export type actionSheetOpen = {
    type: ActionType.BOTTOM_SHEET_OPEN
}

export type actionSheetClose = {
    type: ActionType.BOTTOM_SHEET_CLOSE
}

export type actionSheetToggle = {
    type: ActionType.BOTTOM_SHEET_TOGGLE
}

export type bottomSheetActions = actionSheetOpen | actionSheetClose | actionSheetToggle

export const bottomSheetOpen = (): actionSheetOpen => {
    return {
        type: ActionType.BOTTOM_SHEET_OPEN
    }
}

export const bottomSheetClose = (): actionSheetClose => {
    return {
        type: ActionType.BOTTOM_SHEET_CLOSE
    }
}

export const bottomSheetToggle = (): actionSheetToggle => {
    return {
        type: ActionType.BOTTOM_SHEET_TOGGLE
    }
}

export default bottomSheetActions