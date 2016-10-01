import simpleXhr from '../../shared/client/utils/simple-xhr';
import logException from '../logException';
import {history} from '../history.js';
import {invalidateEvents} from './eventsActions';
import {invalidateTags} from './tagsActions';
import {eventSvcUrl} from './../config';

export const SET_EVENT_ID = 'SET_EVENT_ID';

export function setEventId(eventId) {
    return {
        type: SET_EVENT_ID,
        eventId: eventId
    }
}

export function postEvent(event) {
    return dispatch => {
        return simpleXhr.post(`${eventSvcUrl}/events/`, event, response => {
            if (response.error) {
                logException(response);
            } else {
                dispatch(invalidateEvents());
                dispatch(invalidateTags());
                history.push({pathname: '/'});
            }
        });
    }
}

export function updateEvent(event, eventId) {
    return dispatch => {
        return simpleXhr.put(`${eventSvcUrl}/events/${eventId}`, event, response => {
            if (response.error) {
                logException(response);
            } else {
                dispatch(invalidateEvents());
                dispatch(invalidateTags());
                history.push({pathname: '/'});
            }
        });
    }
}
