import { RootState } from './store';
import { AnyAction, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

interface UserEvent {
	id: number;
	title: string;
	dateStart: string;
	dateEnd: string;
}

interface UserEventsState {
	byIds: Record<UserEvent['id'], UserEvent>;
	allIds: UserEvent['id'][];
}

const LOAD_REQUEST = 'userEvnets/load_request';

interface loadRequestAction extends Action<typeof LOAD_REQUEST> { }

const LOAD_SUCCESS = 'userEvents/load_suscces'

interface loadSuccessAction extends Action<typeof LOAD_SUCCESS>{
    payload: {
        
    }
}

export const loadUserEvents = (): ThunkAction<void, RootState, undefined, loadRequestAction> => async (
	dispatch,
	getState
) => {
    dispatch({ type: LOAD_REQUEST });
    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json()
    } catch(e) {}
};

const initialState: UserEventsState = {
	byIds: {},
	allIds: [],
};
const userEventsReducer = (state: UserEventsState = initialState, action: AnyAction) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default userEventsReducer;
