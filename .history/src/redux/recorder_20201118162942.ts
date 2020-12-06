import { screen } from '@testing-library/react';
import { Action } from "redux";

interface RecorderState { 
    dateStart: string;

}

const START = 'recorder/start';
const STOP = 'recorder/stop';

type StartAction = Action<typeof START>;
type StopAction = Action<typeof STOP>;

const start = (): StartAction => ({
    type:START
})

const stop = (): StopAction => ({
    type:STOP
})

const recorderReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
export default recorderReducer