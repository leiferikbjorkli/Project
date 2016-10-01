import React, { PropTypes } from 'react';
import EventCalendarDay from './../PresentationalComponents/EventCalendar/EventCalendarDay.jsx';


EventCalendarMonth.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  events: PropTypes.object.isRequired,
};

export default function EventCalendarMonth({ events, month, year }) {
  const workingDaysWithEventsData = getWorkingDaysWithEventsData(events, month, year);
  return (
    <div className="eventCalendarMonth">
      {setBeginningOfMonthDayOffset(month, year)}
      {generateDays(workingDaysWithEventsData)}
    </div>
  );
}

function setBeginningOfMonthDayOffset(month, year) {
  const weekdayNumberFirstdayOfMonth = new Date(year, month, 1).getDay();

  const dayOffset = [];
  for (let i = 1; i < weekdayNumberFirstdayOfMonth; i++) {
    dayOffset.push(
      <EventCalendarDay
        key={i}
      />
    );
  }
  return dayOffset;
}

function generateDays(workingDaysWithEventsData) {
  return Object.keys(workingDaysWithEventsData).map((dayKey) => {
    let currentDate = new Date(dayKey);
    let eventsForDay = workingDaysWithEventsData[dayKey];
    return (
      <EventCalendarDay
        key={currentDate.getDate()}
        date={currentDate}
        events={eventsForDay}
      />
    );
  });
}

function getWorkingDaysWithEventsData(events, month, year) {
  const workingDaysInMonth = getEmptyWorkingDaysInMonthObject(month, year);
  events.forEach((currentEvent) => {
    const currentEventStartTime = currentEvent.startTime;
    const currentEventDateKey = new Date(currentEventStartTime);
    currentEventDateKey.setHours(0, 0, 0, 0);
    const dateShouldBeRendered = workingDaysInMonth[currentEventDateKey] !== undefined;
    if (dateShouldBeRendered) {
      workingDaysInMonth[currentEventDateKey].push(currentEvent);
    }
  });

  return workingDaysInMonth;
}

function getEmptyWorkingDaysInMonthObject(month, year) {
  const workingDays = {};

  const currentDateInMonth = new Date(year, month, 1);
  while (currentDateInMonth.getMonth() === month) {
    if (!dateIsWeekend(currentDateInMonth)) {
      workingDays[currentDateInMonth] = [];
    }
    currentDateInMonth.setDate(currentDateInMonth.getDate() + 1);
  }
  return workingDays;
}

function dateIsWeekend(date) {
  return (
    date.getDay() === 6 || date.getDay() === 0
  );
}
