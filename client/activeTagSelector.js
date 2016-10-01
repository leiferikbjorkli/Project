import {createSelector} from 'reselect';
import {Set} from 'immutable'

const eventsSelector = state => {
    return state.getIn(['events', 'items']);
};

const activeTagSelector = createSelector(
    eventsSelector,
    (events) =>  {
        return {
            activeTags: Set(events.flatMap((event) => event.tags))
        }
    }
);

export default activeTagSelector;
