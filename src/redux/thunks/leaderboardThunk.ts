import { Action } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from "../store"
import { leaderboardError, leaderboardPending, leaderboardSuccess, leaderLowestRank, leaderSortByNameAsc, leaderSortByNameDsc } from "../actions/leaderboardActions"
import leaderboard from '../../data/leaderboard.json'

export type User = {
    bananas: number,
    lastDayPlayed: string,
    longestStreak: number,
    name: string,
    stars: number,
    subscribed: boolean,
    uid: string,
    rank?: number,
    searched?: boolean
}
  
type Users = {
    [key: string]: User
}

export function getLeaderboard(user: User) {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {
            dispatch(leaderboardPending())

            const payload = getTenHighestRanks(leaderboard, user)

            dispatch(leaderboardSuccess(payload))
        } catch (e) {
            dispatch(leaderboardError('Error!'))
        }
    }
}

export function getLowestRankThunk() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {
            const users = getTenLowestRanks(leaderboard)

            dispatch(leaderLowestRank(users))
        } catch (error) {
            dispatch(leaderboardError('Error!'))
        }
    }
}

export function sortByNameAsc() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {

            dispatch(leaderboardPending())

            dispatch(leaderSortByNameAsc())
        } catch (error) {
            dispatch(leaderboardError('Error!'))
        }
    }
}

export function sortByNameDsc() {
    return async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        try {

            dispatch(leaderboardPending())

            dispatch(leaderSortByNameDsc())
        } catch (error) {
            dispatch(leaderboardError('Error!'))
        }
    }
}

export function searchByName(list: Users, name: string): User | null {
    for (const key in list) {
        if (list[key].name.toLowerCase() === name.toLowerCase()) {
            return list[key]
        }
    }

    return null
}

export function getTenHighestRanks(list: Users, searchedUser: User | null) {
    let arr = modOrgLeaderboard(list)
    
    // sort by descending order of bananas and add rank
    const modRanks = addRankToList(arr)

    // get top ten highest ranks and sort ascending order
    const tenRanks = modRanks.slice(0, 10).sort(compareRanksAsc)

    // Return Default Top Ten Ranks
    if (!searchedUser) {
        return tenRanks
    }

    const inTopTen = tenRanks.find(u => u.uid === searchedUser.uid)

    // add searched boolean to the query user
    tenRanks.map((val, idx, array) => {
        // if the user is in top ten list
        if ( val.name.toLowerCase() === searchedUser.name.toLowerCase() ) {
            val.searched = true
        }

        // the user not in top ten list but replace with the last user in original list
        if ( tenRanks.length - 1 === idx && !inTopTen ) {
            array[idx] = {
                ...searchedUser,
                searched: true
            }
        }
    })

    return tenRanks
}

export function getTenLowestRanks(list: Users) {
    const arr = modOrgLeaderboard(list)

    const modRanks = addRankToList(arr)

    const tenRanks = modRanks.sort(compareRanksDsc).slice(0, 10)

    return tenRanks.sort((a, b) => a.name.localeCompare(b.name))
}

export function getFuzzySearchRanks(list: Users, users: User[]) {
    const arr = modOrgLeaderboard(list)

    const modRanks = addRankToList(arr)

    const copiedUsers = [...users]

    const results = modRanks.reduce((acc: User[], currVal: User) => {
        copiedUsers.map(val => {
            if ( val.uid === currVal.uid ) {
                acc.push(currVal)
            }
        })

        return acc
    }, [])

    return results.sort(compareRanksDsc)
}

function compare(userA: User, userB: User) {
    return userB.bananas - userA.bananas
}

function compareRanksAsc(userA: User, userB: User) {
    if ( userA.rank && userB.rank ) {
        return userA.rank - userB.rank
    } else {
        return 0
    }
}

function compareRanksDsc(userA: User, userB: User) {
    if ( userA.rank && userB.rank ) {
        return userB.rank - userA.rank
    } else {
        return 0
    }
}

function addRankToList(list: User[]) {
    const arr = [...list]

    arr.sort(compare)
    .map((val, idx) => {
        val.searched = false

        if ( idx > 0 && arr[idx].bananas === arr[idx - 1].bananas ) {
            arr[idx].rank = arr[idx - 1].rank
        } else {
            arr[idx].rank = idx + 1
        }
    })

    return arr
}

export function fuzzySearch(list: Users, name: string) {
    const arr = modOrgLeaderboard(list)

    const matchedUsers = arr.filter(u => u.name.toLowerCase().includes(name))

    if ( matchedUsers.length < 0 ) {
        return []
    }

    return matchedUsers
}

function modOrgLeaderboard(list: Users) {
    const arr = []
    
    for (let key in list) {
        arr.push(list[key])
    }

    return arr
}
