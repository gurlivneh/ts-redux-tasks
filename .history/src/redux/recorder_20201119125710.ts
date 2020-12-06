import { RootState } from './../../.history/src/redux/store_20201118123250';
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

export const start = (): StartAction => ({
	type: START,
});

export const stop = (): StopAction => ({
	type: STOP,
});

export const selectDateStart = (rootState:RootState) => {rootState.recorder}

const initialState: RecorderState = {
    dateStart: ''
}

const recorderReducer = (state: RecorderState = initialState, action: StartAction | StopAction) => {
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
