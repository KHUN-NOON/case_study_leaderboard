import leaderboardActions from '../actions/leaderboardActions'
import { ActionType as LeaderboardActionType } from '../actions/leaderboardActions'
import { User } from '../thunks/leaderboardThunk'

export type dataType = {
    name: string,
    rank: number,
    bananas: number
}

export enum filterType {
    TOP_TEN = 'Highest 10',
    LOWEST_TEN = "Lowest 10"
}

export enum sortNameType {
    ASCENDING = 'Ascending',
    DESCENDING = 'Descending'
}

type stateType = {
    pending: boolean,
    error: string,
    data: User[],
    filter: filterType.LOWEST_TEN | filterType.TOP_TEN,
    sortByName?: sortNameType.ASCENDING | sortNameType.DESCENDING
}

export const initialState: stateType = {
    pending: false,
    error: '',
    data: [],
    filter: filterType.TOP_TEN,
    sortByName: undefined
}

function leaderboardReducer(state = initialState, action: leaderboardActions): stateType {
    switch (action.type) {
        case LeaderboardActionType.LEADERBOARD_SEARCH_PENDING: {
            return {
                ...state,
                pending: true
            }
        }
        case LeaderboardActionType.LEADERBOARD_SEARCH_SUCCESS: {
            const newArr = action.payload

            return {
                ...state,
                filter: filterType.TOP_TEN,
                data: [...newArr]
            }
        }
        case LeaderboardActionType.LEADERBOARD_SEARCH_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case LeaderboardActionType.LEADERBOARD_SORT_BY_NAME_ASC: {
            return {
                ...state,
                sortByName: sortNameType.ASCENDING,
                data: [...state.data].sort((a, b) => a.name.localeCompare(b.name)),
            }
        }
        case LeaderboardActionType.LEADERBOARD_SORT_BY_NAME_DSC: {
            return {
                ...state,
                sortByName: sortNameType.DESCENDING,
                data: [...state.data].sort((a, b) => b.name.localeCompare(a.name)),
            }
        }
        case LeaderboardActionType.LEADERBOARD_LOWEST_RANKS: {
            const newArr = action.payload

            return {
                ...state,
                filter: filterType.LOWEST_TEN,
                sortByName: sortNameType.ASCENDING,
                data: [...newArr]
            }
        }
        default: 
            return state
    }
}

export default leaderboardReducer