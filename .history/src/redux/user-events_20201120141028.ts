import { RootState } from './store';
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

interface UserEvent {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string
}

interface UserEventsState {
    byIds: Record<UserEvent['id'], UserEvent>
    allIds: UserEvent['id'][];

}

export loadUserEvents = (): ThunkAction<
    void,
    RootState,
    undefined,
    Action
> => {

}

const initialState: UserEventsState = {
    byIds: {},
    allIds:[]
}
const userEventsReducer = (state: UserEventsState = initialState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userEventsReducer