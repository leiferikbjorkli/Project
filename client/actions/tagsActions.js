import logException from '../logException';
import tagClient from './../services/tagClient';

const TAGS_URL = 'api/tags';

export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const INVALIDATE_TAGS = 'INVALIDATE_TAGS';

export function invalidateTags() {
    return {
        type: INVALIDATE_TAGS
    }
}

export function requestTags() {
    return {
        type: REQUEST_TAGS
    }
}

export function receiveTags(tags) {
    return {
        type: RECEIVE_TAGS,
        tags: tags,
        receivedAt: Date.now()
    }
}

function fetchTags() {
    return dispatch => {
        dispatch(requestTags());
        return tagClient.get()
              .then(tags => dispatch(receiveTags(tags)))
              .catch(err => logException(err));
    }
}

function shouldFetchTags(state) {
    const tags = state.get('tags');
    if(tags.get('lastUpdated') === -1) {
        return true;
    } else if (tags.get('isFetching')) {
        return false;
    } else {
        return tags.get('didInvalidate');
    }
}

export function fetchTagsIfNeeded() {
    return (dispatch, getState) => {
        if(shouldFetchTags(getState())) {
            return dispatch(fetchTags());
        }
    }

}
