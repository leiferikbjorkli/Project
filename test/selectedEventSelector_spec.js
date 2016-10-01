import {expect} from 'chai';
import {Map, List, Set} from 'immutable';
import selectedEventSelector from '../client/selectedEventSelector';

describe('selectedEventSelector', () => {
    it('finds the event with the selected eventId', () => {
        const state = Map({
            selectedEventId: 'event2',
            events: Map({
                items: List([
                    {
                        Id: 'event1'
                    },
                    {
                        Id: 'event2'
                    },
                    {
                        Id: 'event3'
                    }])
            })
        });
        const selectedEvent = selectedEventSelector(state);
        expect(selectedEvent.get('Id')).to.equal('event2');
    });
    it('returns an empty event if no event is found', () => {
        const state = Map({
            selectedEventId: 'event4',
            events: Map({
                items: List([
                    {
                        Id: 'event1'
                    },
                    {
                        Id: 'event2'
                    },
                    {
                        Id: 'event3'
                    }])
            })
        });
        const selectedEvent = selectedEventSelector(state);
        expect(selectedEvent).to.equal(Map({
            title: '',
            description: '',
            location: '',
            startTime: '',
            endTime: '',
            tags: List(),
            practiceGroups: List(),
            contactPerson: '',
            id: ''
        }));
    });
});
