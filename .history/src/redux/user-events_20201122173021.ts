import { selectDateStart } from './recorder';
import { RootState } from './store';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface UserEvent {
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

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = 'userEvents/load_suscces';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
	payload: {
		events: UserEvent[];
	};
}

const LOAD_FAILURE = 'userEvents/load_failure';

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
	error: string;
}

const CREATE_REQUEST = 'userEvnets/create_request';

interface CreateRequestAction extends Action<typeof CREATE_REQUEST> { }

const CREATE_SUCCESS = 'userEvents/create_suscces';

interface CreateSuccessAction extends Action<typeof CREATE_SUCCESS> {
	payload: {
		event: UserEvent;
	};
}

const CREATE_FAILURE = 'userEvents/create_failure';

interface CreateFailureAction extends Action<typeof CREATE_FAILURE> {
	error: string;
}




export const createUserEvent = (): ThunkAction<
	void,
	RootState,
	undefined,
	CreateRequestAction | CreateSuccessAction | CreateFailureAction
> => async (dispatch, getState) => {
	dispatch({ type: CREATE_REQUEST });
	try {
		const dateStart = selectDateStart(getState())
		const event: Omit<UserEvent, 'id'> = {
			title: 'none',
			dateStart,
			dateEnd: new Date().toISOString()

		}
		const response = await fetch('http://localhost:3001/events', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body:JSON.stringify(event)
		});
		const createdEvent: UserEvent = await response.json();
		dispatch({
			type: CREATE_SUCCESS,
			payload: {event: createdEvent},
		});
	} catch (e) {
		dispatch({
			type: CREATE_FAILURE,
			error: 'Failed to create event',
		});
	}
};


export const loadUserEvents = (): ThunkAction<
	void,
	RootState,
	undefined,
	LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
	dispatch({ type: LOAD_REQUEST });
	try {
		const response = await fetch('http://localhost:3001/events');
		const events: UserEvent[] = await response.json();
		dispatch({
			type: LOAD_SUCCESS,
			payload: { events },
		});
	} catch (e) {
		dispatch({
			type: LOAD_FAILURE,
			error: 'Failed to load events',
		});
	}
};

export const selectUserEventsState = (rootState: RootState) => rootState.userEvents;

export const selectUserEventsArray = (rootState: RootState) => {
	const state = selectUserEventsState(rootState);
	return state.allIds.map((id) => state.byIds[id]);
};

const initialState: UserEventsState = {
	byIds: {},
	allIds: [],
};
const userEventsReducer = (state: UserEventsState = initialState, action: LoadSuccessAction | CreateSuccessAction) => {
	switch (action.type) {
		case LOAD_SUCCESS:
			const { events } = action.payload;
			return {
				...state,
				allIds: events.map(({ id }) => id),
				byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
					byIds[event.id] = event;
					console.log('byIds after reduce', byIds, 'events', events);
					return byIds;
				}, {}),
			};
			case CREATE_SUCCESS:
				const { event } = action.payload
			return {
				...state,
				allIds: [...state.allIds, event.id],
				byIds:{...state.byIds, [event.id]: event}
				}
		
		default:
			return state;
	}
};

export default userEventsReducer;
