import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DeleteUserEvent, loadUserEvents, selectUserEventsArray, UserEvent } from '../../redux/user-events';
import { addZero } from '../../lib/utils';

const Calendar: React.FC = () => {
	const events = useSelector(selectUserEventsArray);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUserEvents());
	}, [dispatch]);

	const handleDelete = (id:number) => {
		dispatch(DeleteUserEvent(id))
	}

	const createDateKey = (date: Date) => {
		const year = date.getUTCFullYear();
		const month = date.getUTCMonth() + 1;
		const day = date.getUTCDate();
		return `${year}-${addZero(month)}-${addZero(day)}`;
	};

	const groupEventsByDay = (events: UserEvent[]) => {
		const groups: Record<string, UserEvent[]> = {};

		const addToGroup = (dateKey: string, event: UserEvent) => {
			if (groups[dateKey] === undefined) {
				groups[dateKey] = [];
			}

			groups[dateKey].push(event);
		};

		events.forEach((event) => {
			const dateStartKey = createDateKey(new Date(event.dateStart));
			const dateEndKey = createDateKey(new Date(event.dateEnd));

			addToGroup(dateStartKey, event);

			if (dateEndKey !== dateStartKey) {
				addToGroup(dateEndKey, event);
			}
		});

		return groups;
	};

	let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
	let sortedGroupKeys: string[] | undefined;

	if (events.length) {
		groupedEvents = groupEventsByDay(events);
		sortedGroupKeys = Object.keys(groupedEvents).sort((date1, date2) => +new Date(date2) - +new Date(date1));
	}

	return (
		<Main>
			{groupedEvents && sortedGroupKeys ? (
				sortedGroupKeys.map((dayKey, i) => {
					const events = groupedEvents ? groupedEvents[dayKey] : [];
					const groupDate = new Date(dayKey);
					const day = groupDate.getDate();
					const month = groupDate.toLocaleString(undefined, { month: 'long' });
					return (
					<Day key={i}>
						<DayLabel>
							<DayLabelSpan>
								{month + " " + day} 
							</DayLabelSpan>
						</DayLabel>
						<Events>
								{events.map((event, i) => {
									const splitDateStart = event.dateStart.split("T")
									const splitStartTime = splitDateStart[1].split(":")
									const startTime = splitStartTime[0] + ":"+ splitStartTime[1]
									const splitDateEnd = event.dateEnd.split("T")
									const splitEndTime = splitDateEnd[1].split(":")
									const endTime = splitEndTime[0] + ":"+ splitEndTime[1] 
								return(
								<Event key={i}>
									<EventInfo>
										<EventTime>{startTime} - {endTime}</EventTime>
										<EventTitle>{event.title}</EventTitle>
									</EventInfo>
									<EventDeleteButton onClick={() => handleDelete(event.id)}>&times;</EventDeleteButton>
								</Event>);
							})}
						</Events>
					</Day>);
				})
			) : (
				<p>loading...</p>
			)}
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

const EventTime = styled.h4``;
const EventTitle = styled.h4``;

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
