import {expect} from 'chai';
import {Map, List} from 'immutable';
import {invalidateGroups, requestGroups, receiveGroups,
        INVALIDATE_GROUPS, REQUEST_GROUPS, RECEIVE_GROUPS} from '../../client/actions/groupsActions';

describe('groupsActions', () => {
    it('returns correct action object for invalidateGroups', () => {
        const action = invalidateGroups();
        expect(action.type).to.equal(INVALIDATE_GROUPS);
    });
    it('returns correct action object for requestGroups', () => {
        const action = requestGroups();
        expect(action.type).to.equal(REQUEST_GROUPS);
    });
    it('returns correct action object for receiveGroups', () => {
        const groups = List(['group1', 'group2']);
        const action = receiveGroups(groups);
        expect(action.type).to.equal(RECEIVE_GROUPS);
        expect(action.groups).to.equal(List(['group1', 'group2']));
    });
})
