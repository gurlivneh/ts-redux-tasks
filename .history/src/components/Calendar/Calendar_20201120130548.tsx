import React from 'react';
import styled from 'styled-components';

const Calendar: React.FC = () => {
	return (
		<Main>
            <Day>
                <DayLabel>
                    <DayLabelSpan>1 May</DayLabelSpan>
                </DayLabel>
                <Events>
                    <Event>
                        <EventInfo>
                            <EventTime>12:00 - 14:00</EventTime>
                            <EventTitle>TypeScript</EventTitle>
                        </EventInfo>
                        <EventDeleteButton>&times;</EventDeleteButton>
                    </Event>
                </Events>

            </Day>
		</Main>
	);
};

export default Calendar;

const Main = styled.div`
	display: flex;
	flex-direction: row-reverse;
	margin: 0 15px;
	padding: 20px 0;
	overflow-x: auto;
`;

const Day = styled.div`
	flex: 0 0 300px;
	padding: 0 20px;
`;

const DayLabel = styled.div`
	font-size: 16px;
	margin: 0 0 15px;
	text-align: center;
`;

const DayLabelSpan = styled.span`
	background: #bae8e8;
	border-radius: 4px;
	color: #272343;
	display: inline-block;
	font-weight: bold;
	padding: 4px 8px;
`;

const Events = styled.div``;

const Event = styled.div`
	align-items: flex-start;
	background: #e3f6f5;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin: 0 0 10px;
	padding: 8px 14px;
`;

const EventInfo = styled.div`
	flex-grow: 1;
	flex-basis: 82%;
	line-height: 23px;
`;

const EventTime = styled.div`
	font-size: 0.8em;
`;
const EventTitle = styled.div`
	font-size: 0.8em;
`;

const EventDeleteButton = styled.button`
	appearance: none;
	background: none;
	border: 0;
	cursor: pointer;
	flex-shrink: 0;
	height: 23px;
	font-size: 18px;
	line-height: 20px;
	margin: 0 0 0 10px;
	padding: 0;
	width: 23px;
`;
