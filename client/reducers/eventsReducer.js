import {List, Map} from 'immutable';
import {INVALIDATE_EVENTS, REQUEST_EVENTS, RECEIVE_EVENTS} from '../actions/eventsActions';

const initialState = Map({
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: List()
});

export default function events(state = initialState, action) {
    switch (action.type) {
        case INVALIDATE_EVENTS:
            return state.set('didInvalidate', true);
        case REQUEST_EVENTS:
            return state.set('didInvalidate', false)
                        .set('isFetching', true);
        case RECEIVE_EVENTS:
            return state.set('isFetching', false)
                        .set('didInvalidate', false)
                        .set('items', List(action.events))
                        .set('lastUpdated', action.receivedAt);
        default:
            return state;
    }
}
