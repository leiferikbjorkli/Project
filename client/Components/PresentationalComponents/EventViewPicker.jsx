import React, { PropTypes } from 'react';

EventViewPicker.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedViewType: PropTypes.string.isRequired,
};

export default function EventViewPicker({ onClick, selectedViewType }) {
  return (
    <div className="eventViewPicker">
      <svg
        className={setClassNames('list', selectedViewType)}
        onClick={() => onClick('list')}
      >
        <use href="static/images/icons.svg#listIcon" />
      </svg>
      <svg
        className={setClassNames('calendar', selectedViewType)}
        onClick={() => onClick('calendar')}
      >
        <use href="static/images/icons.svg#calendarIcon" />
      </svg>
    </div>
  );
}


function setClassNames(viewType, selectedViewType) {
  return (
    (viewType === selectedViewType)
      ? 'eventViewPicker-icon eventViewPicker-icon--selected'
      : 'eventViewPicker-icon'
  );
}
