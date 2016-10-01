import React, { PropTypes } from 'react';
import Arrow from './../../GeneralComponents/Arrow.jsx';

EventCalendarMonthHeader.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  changeMonth: PropTypes.func.isRequired,
};

export default function EventCalendarMonthHeader({ month, year, changeMonth }) {
  return (
    <div className="sectionHeader eventCalendar-header">
      <div className="sectionHeader-content">
        <Arrow
          direction={'left'}
          size={'medium'}
          onClick={() => changeMonth(-1)}
        />
        <span className="eventCalendar-monthHeading">
          {new Date(year, month).toLocaleString('nb-no', { month: 'long' })}
        </span>
        <Arrow
          direction={'right'}
          size={'medium'}
          onClick={() => changeMonth(1)}
        />
      </div>
    </div>
  );
}
