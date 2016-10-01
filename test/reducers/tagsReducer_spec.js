import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {INVALIDATE_TAGS, REQUEST_TAGS, RECEIVE_TAGS} from '../../client/actions/tagsActions';

import reducer from '../../client/reducers/tagsReducer';


describe('tagsReducer', () => {
    it('handles INVALIDATE_TAGS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: INVALIDATE_TAGS
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        }));
    });

    it('handles INVALIDATE_TAGS with undefined state', () => {
        const action = {
            type: INVALIDATE_TAGS,
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        }));
    });

    it('handles REQUEST_TAGS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: REQUEST_TAGS
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            isFetching: true,
            didInvalidate: false,
            lastUpdated: -1,
            items: []
        }))
    });

    it('handles RECEIVE_TAGS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: RECEIVE_TAGS,
            tags: ['tag1', 'tag2'],
            receivedAt: 597672000
        };

        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            isFetching: false,
            didInvalidate: false,
            items: ['tag1', 'tag2'],
            lastUpdated: 597672000
        }))
    });

});
