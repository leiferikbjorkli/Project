import logException from '../logException';
import {getUserInfo} from '../auth';
const USER_URL = 'api/me';

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER';

export function invalidateUser() {
    return {
        type: INVALIDATE_USER
    }
}

export function requestUser() {
    return {
        type: REQUEST_USER
    }
}

export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        user: user,
        receivedAt: Date.now()
    }
}

function fetchUser() {
    return dispatch => {
        dispatch(requestUser());
        return dispatch(receiveUser(getUserInfo()))
    }
}

function shouldFetchUser(state) {
    const user = state.get('user');
    if(user.get('lastUpdated') === -1) {
        return true;
    } else if (user.get('isFetching')) {
        return false;
    } else {
        return user.get('didInvalidate');
    }
}

export function fetchUserIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchUser(getState())) {
            return dispatch(fetchUser());
        }
    }
}
