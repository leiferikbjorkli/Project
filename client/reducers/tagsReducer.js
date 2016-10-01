import {List, Map} from 'immutable';
import {INVALIDATE_TAGS, REQUEST_TAGS, RECEIVE_TAGS} from '../actions/tagsActions';

const initialState = Map({
    isFetching: false,
    didInvalidate: false,
    lastUpdated: -1,
    items: List()
});

export default function tags(state = initialState, action) {
    switch (action.type) {
        case INVALIDATE_TAGS:
            return state.set('didInvalidate', true);
        case REQUEST_TAGS:
            return state.set('didInvalidate', false)
                        .set('isFetching', true);
        case RECEIVE_TAGS:
            return state.set('isFetching', false)
                        .set('didInvalidate', false)
                        .set('items', List(action.tags))
                        .set('lastUpdated', action.receivedAt);
        default:
            return state;

    }
}
