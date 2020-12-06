import React from 'react';
import styled from 'styled-components';
import Recorder from '../Recorder';
const App: React.FC = () => {
  return (
    <Recorder></Recorder>
  )
}

export default App;

const Main = styled.div`
 text-align: center;
 background-color:green;
 height:1000px;
 width:100%;

  
`;
 