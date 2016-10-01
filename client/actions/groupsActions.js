import logException from '../logException';
import groupsClient from '../services/groupsClient';
const GROUPS_URL = 'api/practicegroups';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const INVALIDATE_GROUPS = 'INVALIDATE_GROUPS';

export function invalidateGroups() {
    return {
        type: INVALIDATE_GROUPS
    }
}

export function requestGroups() {
    return {
        type: REQUEST_GROUPS
    }
}

export function receiveGroups(groups) {
    return {
        type: RECEIVE_GROUPS,
        groups: groups,
        receivedAt: Date.now()
    }
}

function fetchGroups() {
    return dispatch => {
        dispatch(requestGroups());
        return groupsClient.get()
            .then(groups => dispatch(receiveGroups(groups)))
            .catch(err => logException(err));
    }
}

function shouldFetchGroups(state) {
    const groups = state.get('groups');
    if(groups.get('lastUpdated') === -1) {
        return true;
    } else if (groups.get('isFetching')) {
        return false;
    } else {
        return groups.get('didInvalidate');
    }
}

export function fetchGroupsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchGroups(getState())) {
            return dispatch(fetchGroups());
        }
    }
}
