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

const LOAD_REQUEST = 'userEvnets/load_request'

interface loadRequestAction extends Action<typeof LOAD_REQUEST> {

}

export const loadUserEvents = (): ThunkAction<void, RootState, undefined, loadRequestAction> => (dispatch, getState) => {
    dispatch({type: LOAD_REQUEST})
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
