import {Set} from 'immutable';
import {expect} from 'chai';
import {TOGGLE_FILTER} from '../../client/actions/activeFilterActions';

import reducer from '../../client/reducers/activeFilterReducer';

describe('activeFilterReducer', () => {
    it('handles TOGGLE_FILTER - add filter', () => {
        const initialState = Set();
        const action = {
            type: TOGGLE_FILTER,
            filter: 'tag1'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Set(['tag1']));
    });

    it('handles TOGGLE_FILTER - remove filter', () => {
        const initialState = Set(['tag1']);
        const action = {
            type: TOGGLE_FILTER,
            filter: 'tag1'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Set());
    });
});
