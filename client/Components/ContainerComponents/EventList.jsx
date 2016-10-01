import React from 'react';
import Event from './../PresentationalComponents/EventList/EventListEvent.jsx';

const EventList = React.createClass({
    render: function() {
        return <ul className="eventList">
            {this.filteredEvents().map(event => {
                return <Event key={event.id} event={event} editable={true}/>
            })}
        </ul>;
    },
    filteredEvents: function() {
        return this.props.events.filter((event) => {
            return this.props.activeFilter.isSubset(event.tags);
        });
    }
});

export default EventList;