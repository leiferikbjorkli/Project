import {List, Map} from 'immutable';
import {expect} from 'chai';
import {TOGGLE_EXPANDED} from '../../client/actions/expandedActions';
import reducer from '../../client/reducers/expandedReducer';

describe('expandedReducer', () => {
    it('handles TOGGLE_EXPANDED', () => {
        const initialState = false;
        const action = {
            type: TOGGLE_EXPANDED
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(true);
    });
});
