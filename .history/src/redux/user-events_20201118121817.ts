interface UserEvent {
    id: number,
    title: string,
    dateStart: string,
    dateEnd: string
}

interface UserEventsState {
    byIds: Record<UserEvent['id'], UserEvent>
    allIds: UserEvent['id'][];

}

const userEventsReducer = (state<<Us, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userEventsReducer