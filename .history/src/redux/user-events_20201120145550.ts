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

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> { }

const LOAD_SUCCESS = 'userEvents/load_suscces'

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS>{
    payload: {
        events: UserEvent[];
    }
}

const LOAD_FAILURE = 'userEvents/load_failure'

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> { }



export const loadUserEvents = (): ThunkAction<void, RootState, undefined, LoadRequestAction | LoadSuccessAction | LoadFailureAction> => async (
	dispatch,
	getState
) => {
    dispatch({ type: LOAD_REQUEST });
    try {
        const response = await fetch('http://localhost:3001/events');
        const events: UserEvent[] = await response.json()
        dispatch({
            type: LOAD_SUCCESS,
            payload: { events }
        })
    } catch (e) {
        dispatch({ type: LOAD_FAILURE });

    }
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
