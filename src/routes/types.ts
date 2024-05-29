import { User } from "../redux/thunks/leaderboardThunk"

export type MainStackParamList = {
    "Home": undefined,
    "Search Result": User | undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainStackParamList {}
    }
}