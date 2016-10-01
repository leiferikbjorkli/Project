import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';
import {invalidateTags, requestTags, receiveTags,
        INVALIDATE_TAGS, REQUEST_TAGS, RECEIVE_TAGS} from '../../client/actions/tagsActions';

describe('tagsActions', () => {
    it('returns correct action object for invalidateTags', () => {
        const action = invalidateTags();
        expect(action.type).to.equal(INVALIDATE_TAGS);
    });

    it('returns correct action object for requestTags', () => {
        const action = requestTags();
        expect(action.type).to.equal(REQUEST_TAGS);
    });

    it('returns correct action object for receiveTags', () => {
        const tags = List(['tag1', 'tag2']);
        const action = receiveTags(tags);
        expect(action.type).to.equal(RECEIVE_TAGS);
        expect(action.tags).to.equal(List(['tag1', 'tag2']));
    });
})
