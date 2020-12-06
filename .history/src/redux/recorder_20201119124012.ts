import { screen } from '@testing-library/react';
import { Action } from 'redux';
import moment from "moment";


interface RecorderState {
	dateStart: string;
}

const START = 'recorder/start';
const STOP = 'recorder/stop';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

const start = (): StartAction => ({
	type: START,
});

const stop = (): StopAction => ({
	type: STOP,
});

const recorderReducer = (state: RecorderState, action: StartAction | StopAction) => {
    switch (action.type) {
        case START:
            return { ...state, dateStart: moment.unix(Date.now()).format("MM/DD/YYYY") };
        case STOP:
            return { ...state, dateStart: '' };
		default:
			return state;
	}
};
export default recorderReducer;
