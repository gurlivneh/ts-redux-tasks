import { RootState } from './store';
import {  Action } from 'redux';
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

interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

const LOAD_SUCCESS = 'userEvents/load_suscces';

interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
	payload: {
		events: UserEvent[];
	};
}

const LOAD_FAILURE = 'userEvents/load_failure';

interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
    error: string
}

export const loadUserEvents = (): ThunkAction<
	void,
	RootState,
	undefined,
	LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch, getState) => {
	dispatch({ type: LOAD_REQUEST });
	try {
        const response = await fetch('http://localhost:3001/events');
        console.log("events after request",response)
        const events: UserEvent[] = await response.json();
		dispatch({
			type: LOAD_SUCCESS,
			payload: { events },
		});
	} catch (e) {
        dispatch({
            type: LOAD_FAILURE,
            error: 'Failed to load events'
        });
	}
    };

export const selectUserEventsState = (rootState: RootState) => rootState.userEvents

export const selectUserEventsArray = (rootState: RootState) => {
    const state = selectUserEventsState(rootState);
    return state.allIds.map(id => state.byIds[id])
}

const initialState: UserEventsState = {
	byIds: {},
	allIds: [],
};
const userEventsReducer = (state: UserEventsState = initialState, action: LoadSuccessAction) => {
    switch (action.type) {
        case LOAD_SUCCESS:
            const { events } = action.payload;
            return {
                ...state, allIds: events.map(({ id }) => id), byIds: events.reduce<UserEventsState['byIds']>((byIds, event) => {
                    byIds[event.id] = event;
                    console.log("byIds after reduce", byIds, 'events', events)
                    return byIds;
                }, {}
                )
            };
		default:
			return state;
	}
};

export default userEventsReducer;
