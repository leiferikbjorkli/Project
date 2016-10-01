import {List, Map} from 'immutable';
import {expect} from 'chai';
import {SET_EVENT_ID} from '../../client/actions/eventActions';

import reducer from '../../client/reducers/eventReducer';

describe('eventReducer', () => {
    it('handles SET_EVENT_ID', () => {
        const initialState = '';
        const action = {
            type: SET_EVENT_ID,
            eventId: 'eventId123'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal('eventId123');
    });
});