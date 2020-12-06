import React from 'react';
import styled from 'styled-components';
import Calendar from '../Calendar';
import Recorder from '../Recorder';

const App: React.FC = () => {
	return (
		<Main>
			<Recorder />
			<Calendar />
		</Main>
	);
};

export default App;

const Main = styled.div`
	text-align: center;
	background-color:lightgray;
`;
