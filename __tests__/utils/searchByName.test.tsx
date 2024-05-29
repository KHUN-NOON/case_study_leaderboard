import { fuzzySearch, searchByName } from "../../src/redux/thunks/leaderboardThunk"
import leaderboard from '../../src/data/leaderboard.json'

const fuzzySearchResults = [
    {
        "bananas" : 27800,
        "lastDayPlayed" : "2018-12-30",
        "longestStreak" : 7,
        "name" : "Patrick Kennedy",
        "stars" : 104,
        "subscribed" : true,
        "uid" : "zOztg0xHJwN2GSHO9XSFAPvTl7E2"
    },
    {
        "bananas" : 500,
        "lastDayPlayed" : "2018-10-15",
        "longestStreak" : 1,
        "name" : "Patrick Meyer",
        "stars" : 5,
        "subscribed" : false,
        "uid" : "zxbkdkfuUKVbmQJlQfrX1K0XupD3"
    },
]

describe('search user by name', () => {
    it('should return searched user', () => {
        expect(searchByName(leaderboard, "Rica Ella Francisco"))
        .toEqual({
            bananas: 200,
            lastDayPlayed: "2018-11-22",
            longestStreak: 1,
            name: "Rica Ella Francisco",
            stars: 6,
            subscribed: false,
            uid: "00D1LA8puAa1GINkVpfgC1TmO0m1"
        })
    })

    it('should return null', () => {
        expect(searchByName(leaderboard, "Rica"))
        .toEqual(null)
    })

    it('should return fuzzy search results', () => {
        const tst = fuzzySearch(leaderboard, "pat")

        expect(tst)
        .toEqual(fuzzySearchResults)
    })

    it('should return single fuzzy search results', () => {
        const tst = fuzzySearch(leaderboard, "patrick kennedy")

        expect(tst.length)
        .toEqual(1)
    })

    it('should return empty array when fuzzy search not found', () => {
        const tst = fuzzySearch(leaderboard, "nor")

        expect(tst)
        .toEqual([])
    })
})