import recorderReducer  from './recorder';
import { combineReducers, createStore} from "redux";
import userEventsReducer from "./user-events";

const rootReducer = combineReducers({
    userEvents: userEventsReducer,
    recorder: recorderReducer
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer)

export default store