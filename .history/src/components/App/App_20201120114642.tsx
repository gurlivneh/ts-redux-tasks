import React from 'react';
import styled from 'styled-components';
import Recorder from '../Recorder';
import { } from 'styled-components/cssprop'

const App: React.FC = () => {
	return (
		<Main>
			<Recorder />
		</Main>
	);
};

export default App;

const Main = styled.div`
	text-align: center;
`;
