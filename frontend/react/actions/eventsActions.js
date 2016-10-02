const EVENTS_URL = 'api/events/upcoming';
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const INVALIDATE_EVENTS = 'INVALIDATE_EVENTS';

export function invalidateEvents() {
    return {
        type: INVALIDATE_EVENTS
    }
}

export function requestEvents() {
    return {
        type: REQUEST_EVENTS
    }
}

export function receiveEvents(events) {
    return {
        type: RECEIVE_EVENTS,
        events: events,
        receivedAt: Date.now()
    }
}

function fetchEvents() {
    return dispatch => {
        dispatch(requestEvents());
        return eventClient.get()
            .then(events => {
                dispatch(receiveEvents(events))
            })
            .catch(err => {
            });
    }
}

function shouldFetchEvents(state) {
    const events = state.get('events');
    if (events.get('lastUpdated') === -1) {
        return true;
    } else if (events.get('isFetching')) {
        return false;
    } else {
        return events.get('didInvalidate');
    }
}

export function fetchEventsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchEvents(getState())) {
            return dispatch(fetchEvents());
        }
    }
}
