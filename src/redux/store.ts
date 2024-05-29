import { legacy_createStore as createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers/rootReducer"
import { thunk } from "redux-thunk"
import { useDispatch, useSelector } from "react-redux"

const store = createStore(rootReducer, {},applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store