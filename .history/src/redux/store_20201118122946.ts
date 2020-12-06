import { combineReducers, createStore, Store } from "redux";
import userEventsReducer from "./user-events";

const rootReducer = combineReducers({
    userEvents: userEventsReducer
})

const store = createStore(rootReducer)

export default store