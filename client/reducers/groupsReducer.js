import {List, Map} from 'immutable';
import {INVALIDATE_GROUPS, REQUEST_GROUPS, RECEIVE_GROUPS} from '../actions/groupsActions';

const initialState = Map({
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: List()
});

export default function groups(state = initialState, action) {
    switch (action.type) {
        case INVALIDATE_GROUPS:
            return state.set('didInvalidate', true);
        case REQUEST_GROUPS:
            return state.set('didInvalidate', false)
                        .set('isFetching', true);
        case RECEIVE_GROUPS:
            return state.set('isFetching', false)
                        .set('didInvalidate', false)
                        .set('items', List(action.groups))
                        .set('lastUpdated', action.receivedAt)
        default:
            return state;

    }
}
