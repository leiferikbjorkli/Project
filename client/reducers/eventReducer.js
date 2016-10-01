import {SET_EVENT_ID} from '../actions/eventActions'

const initialState = '';

export default function selected_event_id(state = initialState, action) {
    switch (action.type) {
        case SET_EVENT_ID:
            return action.eventId;
        default:
            return state;
    }
}
