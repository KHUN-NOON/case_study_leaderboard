import { combineReducers } from "redux"
import testReducer from "./testReducer"
import leaderboardReducer from "./leaderboardReducer"
import bottomSheetReducer from "./bottomSheetReducer"

const rootReducer = combineReducers({
    test: testReducer,
    leaderboard: leaderboardReducer,
    bottomsheet: bottomSheetReducer
})

export default rootReducer