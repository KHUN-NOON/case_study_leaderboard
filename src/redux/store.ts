import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/rootReducer"

const middleware = []

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

export default store