import React, { PropTypes } from 'react';
import EventDate from './EventListEventDate.jsx';
import EventDetail from './EventListEventDetail.jsx';


const EventListEvent = ({ event, editable }) => (
  <li className="eventList-event">
    <EventDate event={event} />
    <EventDetail event={event} editable={editable} />
  </li>
);

EventListEvent.propTypes = {
  event: PropTypes.object,
  editable: PropTypes.bool,
};

export default EventListEvent;
