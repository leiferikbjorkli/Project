import {createSelector} from 'reselect';
import {fromJS} from 'immutable';

const eventSelector = state => {
    return state.getIn(['events', 'items']);
};

const selectedEventId = state => {
    return state.get('selectedEventId');
};

const selectedEventSelector = createSelector(
    eventSelector, selectedEventId,
    (events, eventId) => {
        if (!!events.find((event) => event.id === eventId)) {
            return fromJS(events.find((event) => event.id === eventId))
        }

        return fromJS({
            title: '',
            description: '',
            location: '',
            startTime: '',
            endTime: '',
            tags: [],
            practiceGroups: [],
            contactPerson: '',
            id: ''
        });
    }
);

export default selectedEventSelector;
