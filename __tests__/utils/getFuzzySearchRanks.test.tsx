import { fuzzySearch, getFuzzySearchRanks } from "../../src/redux/thunks/leaderboardThunk"
import leaderboard from "../../src/data/leaderboard.json"

describe('get ranks from fuzzy search', () => {
    it('should return more than one results', () => {
        const users = fuzzySearch(leaderboard, 'patrick')

        const result = getFuzzySearchRanks(leaderboard, users)

        console.log("fuzzy search > 1: ", result)
    })

    it('should return only one result', () => {
        const users = fuzzySearch(leaderboard, 'patrick kennedy')

        const result = getFuzzySearchRanks(leaderboard, users)

        console.log("fuzzy search == 1: ", result)
    })

    it('should return empty result', () => {
        const users = fuzzySearch(leaderboard, 'kyaung mee shay')

        const result = getFuzzySearchRanks(leaderboard, users)

        console.log("fuzzy search empty: ", result)
    })

    it('should return emplty result when search with empty string', () => {
        const users = fuzzySearch(leaderboard, '')

        const result = getFuzzySearchRanks(leaderboard, users)

        console.log("fuzzy search empty: ", result)
    })
})