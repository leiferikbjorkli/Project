import React from 'react';
import moment from 'moment';

export default function EventCalendarWeekdayRow() {
  return (
    <ul className="weekdays">
      {generateWeekdays()}
    </ul>
  );
}

function generateWeekdays() {
  const weekDays = moment.weekdays().map((day) =>
    <li
      className="eventCalendar-day eventCalendar-weekdayLabel"
      key={day}
    >
      {day}
    </li>
  );
  return weekDays.slice(1, 6);
}
