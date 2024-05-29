import { User } from "../thunks/leaderboardThunk"

export enum ActionType {
    LEADERBOARD_SEARCH_DEFAULT = "leaderboard/search/default",
    LEADERBOARD_SEARCH_PENDING = "leaderboard/search/pending",
    LEADERBOARD_SEARCH_SUCCESS = "leaderboard/search/success",
    LEADERBOARD_SEARCH_ERROR = "leaderboard/search/error",
    LEADERBOARD_SORT_BY_NAME_ASC = "leaderboard/sort_by_name/asc",
    LEADERBOARD_SORT_BY_NAME_DSC = "leaderboard/sort_by_name/dsc",
    LEADERBOARD_LOWEST_RANKS = "leaderboard/lowest_ranks"
}

type actionPending = {
    type: ActionType.LEADERBOARD_SEARCH_PENDING,
}

type actionSuccess = {
    type: ActionType.LEADERBOARD_SEARCH_SUCCESS
    payload: User[]
}

type actionError = {
    type: ActionType.LEADERBOARD_SEARCH_ERROR,
    payload: 'Error!' | 'User Not Found'
}

type actionDefault = {
    type: ActionType.LEADERBOARD_SEARCH_DEFAULT
}

type actionSortByNameAsc = {
    type: ActionType.LEADERBOARD_SORT_BY_NAME_ASC
}

type actionSortByNameDsc = {
    type: ActionType.LEADERBOARD_SORT_BY_NAME_DSC
}

type actionLowestRanks = {
    type: ActionType.LEADERBOARD_LOWEST_RANKS,
    payload: User[]
}

type leaderboardActions = actionPending | actionSuccess | actionError | actionDefault | actionSortByNameAsc | actionSortByNameDsc | actionLowestRanks

export const leaderboardPending = (): actionPending => {
    return {
        type: ActionType.LEADERBOARD_SEARCH_PENDING
    }
}

export const leaderboardSuccess = (data: User[]): actionSuccess => {
    return {
        type: ActionType.LEADERBOARD_SEARCH_SUCCESS,
        payload: data
    }
}

export const leaderboardError = (msg: actionError['payload']): actionError => {
    return {
        type: ActionType.LEADERBOARD_SEARCH_ERROR,
        payload: msg
    }
}

export const leaderboardDefault = (): actionDefault => {
    return {
        type: ActionType.LEADERBOARD_SEARCH_DEFAULT
    }
}

export const leaderSortByNameAsc = (): actionSortByNameAsc => {
    return {
        type: ActionType.LEADERBOARD_SORT_BY_NAME_ASC
    }
}

export const leaderSortByNameDsc = (): actionSortByNameDsc => {
    return {
        type: ActionType.LEADERBOARD_SORT_BY_NAME_DSC
    }
}

export const leaderLowestRank = (data: User[]): actionLowestRanks => {
    return {
        type: ActionType.LEADERBOARD_LOWEST_RANKS,
        payload: data
    }
}

export default leaderboardActions