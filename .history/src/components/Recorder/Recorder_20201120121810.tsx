import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDateStart, start, stop } from '../../redux/recorder';
import styled from 'styled-components';
import type {} from 'styled-components/cssprop';


const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);


const Recorder = () => {
	const dispatch = useDispatch();
	const dateStart = useSelector(selectDateStart);
	const started = dateStart !== '';
	let interval = useRef<number>(0);
	const [, setCount] = useState<number>(0);
    const handleClick = () => {
        if (started) {
            dispatch(stop())
            window.clearInterval(interval.current);
        } else {
            dispatch(start());
            interval.current = window.setInterval(() => {
                setCount((count) => count + 1);
            }, 1000);
        }
	};

	useEffect(() => {
		return () => {
			window.clearInterval(interval.current);
		};
	}, []);

	let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0;
	const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
	seconds -= hours * 60 * 60;
	const minutes = seconds ? Math.floor(seconds / 60) : 0;
	seconds -= minutes * 60;
	return (
		<Main>
			<Button onClick={handleClick} started={started}>
				<Span started={started}></Span>
			</Button>
            <Counter started={started}>{addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}</Counter>
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
	border-radius: 50%;
	cursor: pointer;
	height: 60px;
	width: 60px;
`;

const Span = styled.span`
	background: #f25042;
	border-radius: ${(props) => (props.started ? 0 : 50)}%;
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
	opacity: ${(props) => (props.started ? 1 : 0.5)};
	transition: opacity 0.3s ease-out;
`;
