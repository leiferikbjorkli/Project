import {List, Map} from 'immutable';
import {expect} from 'chai';
import {INVALIDATE_EVENTS, REQUEST_EVENTS, RECEIVE_EVENTS} from '../../client/actions/eventsActions';

import reducer from '../../client/reducers/eventsReducer';

describe('eventsReducer', () => {
    it('handles INVALIDATE_EVENTS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: INVALIDATE_EVENTS
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        }));
    });

    it('handles INVALIDATE_EVENTS with undefined state', () => {
        const action = {
            type: INVALIDATE_EVENTS
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        }))
    });

    it('handles REQUEST_EVENTS', () => {
        const initialState = Map({
            isFetching: false,
            didInvalidate: true,
            lastUpdated: -1,
            items: List()
        });
        const action = {
            type: REQUEST_EVENTS
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: true,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        }));
    });

    it('handles RECEIVE_EVENTS', () => {
        const initialState = Map({
            isFetching: true,
            didInvalidate: false,
            lastUpdated: -1,
            items: List()
        });

        const action = {
            type: RECEIVE_EVENTS,
            events: ['event1', 'event2'],
            receivedAt: 597672000
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            isFetching: false,
            didInvalidate: false,
            items: List(['event1', 'event2']),
            lastUpdated: 597672000
        }))
    })
})
