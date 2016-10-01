import {TOGGLE_EXPANDED} from '../actions/expandedActions';

const initialState = false;

export default function expanded(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_EXPANDED:
            return !state;
        default:
            return state;
    }
}
