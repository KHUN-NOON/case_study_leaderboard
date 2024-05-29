import leaderboardReducer, { filterType, sortNameType } from "../../../src/redux/reducers/leaderboardReducer"
import { ActionType, leaderboardDefault, leaderboardError, leaderboardPending, leaderboardSuccess, leaderLowestRank } from "../../../src/redux/actions/leaderboardActions"
import store from "../../../src/redux/store"
import leaderboard from "../../../src/data/leaderboard.json"
import { getTenHighestRanks, getTenLowestRanks, searchByName } from "../../../src/redux/thunks/leaderboardThunk"

const lowestRanks = [
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Adh Fuoo',
      stars: 4,
      subscribed: false,
      uid: 'x8RNvUgv5pZqDVatEXb2aYgSflq1',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Dummy Name',
      stars: 5,
      subscribed: false,
      uid: 'ynp3NHnzBBYGf0WWiOdMDug0bXZ2',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Nur Gümüş',
      stars: 5,
      subscribed: false,
      uid: 'ymonOSLRONZxm99JFaPcbUoZSOF3',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Ocelotl Kanpol',
      stars: 5,
      subscribed: false,
      uid: 'yoDHUejMeshN1bOw9Bq671vMaph2',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Qiao Yee',
      stars: 5,
      subscribed: false,
      uid: 'yniH9BMgoUYDFV3oNzBoKLq9BYj1',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Toke Chen',
      stars: 4,
      subscribed: false,
      uid: 'ylwtBuIr70fEIxcCE80fSRRo7np2',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Victoria Lea',
      stars: 5,
      subscribed: false,
      uid: 'yoSIZR2qFWPHCxezohG6A6j1Z0A3',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: 'Yo Yo Chou',
      stars: 4,
      subscribed: false,
      uid: 'ylsPzJdfKggHuBVcqHVYxzVRdtJ2',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: '박성재',
      stars: 5,
      subscribed: false,
      uid: 'yoGaR3ZFBhbzquGaxpj0kYSWZ3E3',
      searched: false,
      rank: 268
    },
    {
      bananas: 0,
      lastDayPlayed: '2017-11-01',
      longestStreak: 0,
      name: '王連辟',
      stars: 5,
      subscribed: false,
      uid: 'ymAf3Zs3MCe0zwjQnATm2B9LmeY2',
      searched: false,
      rank: 268
    }
]


describe('leaderboard reducers', () => {
    const initialState = store.getState().leaderboard

    beforeEach(() => {
        store.dispatch(leaderboardDefault())
    })

    it('should return initial state', () => {
        expect(leaderboardReducer(initialState, leaderboardDefault())).toEqual(initialState)
    })

    it(`should handle ${ActionType.LEADERBOARD_SEARCH_PENDING}`, () => {
        expect(leaderboardReducer(initialState, leaderboardPending()))
        .toEqual({
            ...initialState,
            pending: true
        })
    })

    it(`should handle ${ActionType.LEADERBOARD_SEARCH_SUCCESS}`, () => {
        const user = searchByName(leaderboard, 'Patrick Kennedy')

        const results = getTenHighestRanks(leaderboard, user)

        expect(leaderboardReducer(initialState, leaderboardSuccess(results)))
        .toEqual({
            ...initialState,
            filter: filterType.TOP_TEN,
            data: [...results]
        })
    })

    it(`should handle ${ActionType.LEADERBOARD_SEARCH_ERROR}`, () => {
        expect(leaderboardReducer(initialState, leaderboardError('Error!')))
        .toEqual({
            ...initialState,
            error: 'Error!'
        })
    })

    it(`should handle ${ActionType.LEADERBOARD_LOWEST_RANKS}`, () => {
        const results = getTenLowestRanks(leaderboard)

        expect(leaderboardReducer(initialState, leaderLowestRank(results)))
        .toEqual({
            ...initialState,
            filter: filterType.LOWEST_TEN,
            sortByName: sortNameType.ASCENDING,
            data: [
                ...lowestRanks
            ]
        })
    })
})