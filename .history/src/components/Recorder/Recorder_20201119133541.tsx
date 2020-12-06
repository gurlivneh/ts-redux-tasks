import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDateStart, start } from '../../redux/recorder';
import styled from 'styled-components';


const Recorder = () => {
    const dispatch = useDispatch()
    const dateStart = useSelector(selectDateStart)
    const started = dateStart !== ''
    const handleClick = () => {
        dispatch(start())
    }
	return (
		<Main>
			<Button onClick={handleClick} started={started}>
				<Span started={started}></Span>
            </Button>
            <Counter>00:00:00</Counter>
		</Main>
	);
};

export default Recorder;


const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 60px 0 40px;
`;

const Button = styled.button`
  background: #e3f6f5;
  border: 0;
  border-radius: ${props => props.started ? 0 : 50}%;
  cursor: pointer;
  height: 60px;
  width: 60px;
`;

const Span = styled.span`
  background: #f25042;
  border-radius: ${props => props.started ? 0 : 50}%;
  display: inline-block;
  height: 24px;
  vertical-align: middle;
  width: 24px;
  transition: all 0.3s ease-out;
`;
const Counter = styled.div`
  margin: 0 0 0 15px;
  text-align: center;
  width: 80px;
  opacity: 0.5;
  transition: opacity 0.3s ease-out;
`;
 
 
