import React, { PropTypes } from 'react';
import { Link } from 'react-router';

EventCalendarDay.propTypes = {
  key: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  events: PropTypes.array,
};

export default function EventCalendarDay({ key, date, events }) {
  return (
    (date !== undefined && events !== undefined)
    ?
    (
      <article
        className="eventCalendar-day"
        key={key}
      >
        {date.getDate()}
        <ul className="eventCalendar-eventList">
          {events.map((event) => (
            <li key={event.id}>
              <Link
                to={`/edit/${event.id}`}
                onClick={() => {this.props.dispatch(setEventId(event.id))}}
                key={event.id}
                className="eventCalendar-event"
              >
                {generateEventItems(event.tags, 'eventCalendar-event-tag')}
                <div className="eventCalendar-event-title">
                  {event.title}
                </div>
                {generateEventItems(event.practiceGroups, 'eventCalendar-event-category')}
              </Link>
            </li>
            ))
          }
        </ul>
      </article>
    )
    :
    (
      <div
        className="eventCalendar-day"
        key={key}
      >
      </div>
    )
  );
}


function generateEventItems(itemArray, className) {
  return (
    <ul className={`${className}Container`}>
      {itemArray.map((item) => (
        <li
          className={className}
          key={item}
        >
          {item}
        </li>
        )
      )}
    </ul>
  );
}
