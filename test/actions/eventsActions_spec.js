import {expect} from 'chai';
import {List} from 'immutable';
import {invalidateEvents, requestEvents, receiveEvents,
        INVALIDATE_EVENTS, REQUEST_EVENTS, RECEIVE_EVENTS} from '../../client/actions/eventsActions';

describe('eventsActions', () => {
    it('returns correct action object for invalidateEvents', () => {
        const action = invalidateEvents();
        expect(action.type).to.equal(INVALIDATE_EVENTS);
    });

    it('returns correct action object for requestEvents', () => {
        const action = requestEvents();
        expect(action.type).to.equal(REQUEST_EVENTS);
    });

    it('returns correct action object for receiveEvents', () => {
        const events = List(['event1', 'event2']);
        const action = receiveEvents(events);
        expect(action.type).to.equal(RECEIVE_EVENTS);
        expect(action.events).to.equal(List(['event1', 'event2']));
    })

})
