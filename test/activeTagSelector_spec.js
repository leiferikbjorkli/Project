import {expect} from 'chai';
import {Map, List, Set} from 'immutable';
import activeTagSelector from '../client/activeTagSelector';

describe('activeTagSelector', () => {
    it('returns a unique list of tags', () => {
        const state = Map({
            events: Map({
                items: List([
                    {
                        Tags: ['tag1', 'tag2']
                    },
                    {
                        Tags: ['tag2', 'tag3', 'tag1']
                    }])
            })
        });
        const activeTags = activeTagSelector(state);
        expect(activeTags.activeTags).to.equal(Set(['tag1', 'tag2', 'tag3']));
    });
});
