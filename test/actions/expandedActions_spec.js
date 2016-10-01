import {expect} from 'chai';
import {toggleExpanded,
        TOGGLE_EXPANDED} from '../../client/actions/expandedActions';

describe('expandedActions', () => {
    it('returns correct action object for toggleExpanded', () => {
        const action = toggleExpanded();
        expect(action.type).to.equal(TOGGLE_EXPANDED);
    })
});
