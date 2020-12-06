 import React, { useState } from 'react';
import styled from 'styled-components';

const EventItem: React.FC = (props: any) => {
    const { event, handleDelete } = props.children;
    const [editable, setEditable] = useState(false)
    const splitDateStart = event.dateStart.split('T');
    const splitStartTime = splitDateStart[1].split(':');
    const startTime = splitStartTime[0] + ':' + splitStartTime[1];
    const splitDateEnd = event.dateEnd.split('T');
    const splitEndTime = splitDateEnd[1].split(':'); 
    const endTime = splitEndTime[0] + ':' + splitEndTime[1];
    const handleTitleClick = () => {
        setEditable(!editable)
    }
    return (
            <Event >
                <EventInfo>
                    <EventTime>{startTime} - {endTime}</EventTime>
                 {editable ? <EventInput onClick={handleTitleClick}/> : <EventTitle onClick={handleTitleClick}>{event.title}</EventTitle>}
                </EventInfo>
                <EventDeleteButton onClick={() => handleDelete(event.id)}>&times;</EventDeleteButton>
            </Event>);
    
};

export default EventItem;

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

const EventTime = styled.h4``;
const EventTitle = styled.h4``;

const EventInput = styled.input`

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