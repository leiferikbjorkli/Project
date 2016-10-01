import {List, Map} from 'immutable';
import {expect} from 'chai';
import {INVALIDATE_GROUPS, REQUEST_GROUPS, RECEIVE_GROUPS} from '../../client/actions/groupsActions';

import reducer from '../../client/reducers/groupsReducer';

describe('groupsReducer', () => {
    it('handles INVALIDATE_GROUPS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: INVALIDATE_GROUPS
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        }));
    });

    it('handles REQUEST_GROUPS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: REQUEST_GROUPS
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: true,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        }))
    });

    it('handles RECEIVE_GROUPS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: RECEIVE_GROUPS,
            groups: ['group1', 'group2'],
            receivedAt: 597672000
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: false,
            didInvalidate: false,
            items: List(['group1', 'group2']),
            lastUpdated: 597672000
        }))
    });
})
