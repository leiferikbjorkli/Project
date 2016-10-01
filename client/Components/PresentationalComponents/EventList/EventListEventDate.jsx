import React, { PropTypes } from 'react';
import moment from 'moment';

const EventDate = ({ event }) => {
  const start = moment(event.startTime);
  return (
    <div className="eventList-event-left">
      <div className="eventList-event-fromDay">{start.format('dddd')}</div>
      <div className="eventList-event-fromDate">{start.format('DD')}</div>
      <div className="eventList-event-fromTime">{`Kl. ${start.format('HH.mm')}`}</div>
    </div>
  );
};

EventDate.propTypes = {
  event: PropTypes.object,
};

export default EventDate;
