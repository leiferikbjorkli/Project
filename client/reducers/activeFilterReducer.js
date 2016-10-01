import {Set} from 'immutable';
import {TOGGLE_FILTER} from '../actions/activeFilterActions';

const initialState = Set();

export default function activeFilter(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FILTER:
            if (state.has(action.filter)) {
                return state.delete(action.filter);
            } else {
                return state.add(action.filter);
            }
        default:
            return state;
    }
}
