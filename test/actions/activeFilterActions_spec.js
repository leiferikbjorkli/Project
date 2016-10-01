import {expect} from 'chai';
import {toggleFilter,
        TOGGLE_FILTER} from '../../client/actions/activeFilterActions';

describe('activeFilterActions', () => {
    it('returns correct action object for toggleFilter', () => {
        const filter = 'tagname';
        const action = toggleFilter(filter);
        expect(action.type).to.equal(TOGGLE_FILTER);
        expect(action.filter).to.equal(filter);
    })
});
