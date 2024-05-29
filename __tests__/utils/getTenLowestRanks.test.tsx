import { getTenLowestRanks } from "../../src/redux/thunks/leaderboardThunk"
import leaderboard from '../../src/data/leaderboard.json'

describe('get 10 lowest ranks', () => {
    it('should return default lowest ranks', () => {
        const result = getTenLowestRanks(leaderboard)

        console.log(result)
    })
})