import React, { PropTypes } from 'react';
import EventCalendarMonth from './EventCalendarMonth.jsx';
import EventCalendarMonthHeader from './../PresentationalComponents/EventCalendar/EventCalendarMonthHeader.jsx';
import EventCalendarWeekdayRow from './../PresentationalComponents/EventCalendar/EventCalendarWeekdayRow.jsx';


export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: this.props.currentMonth,
      currentYear: this.props.currentYear,
    };

    this.changeMonth = this.changeMonth.bind(this);
  }
  changeMonth(change) {
    let currentMonth = this.state.currentMonth + change;
    let currentYear = this.state.currentYear;

    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }

    this.setState({ currentMonth, currentYear });
  }
  render() {
    return (
      <div className="eventCalendar">
        <EventCalendarMonthHeader
          month={this.state.currentMonth}
          year={this.state.currentYear}
          changeMonth={this.changeMonth}
        />
        <EventCalendarWeekdayRow />
        <EventCalendarMonth
          events={this.props.events}
          month={this.state.currentMonth}
          year={this.state.currentYear}
        />
      </div>
    );
  }
}

EventCalendar.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  events: PropTypes.object.isRequired,
};

EventCalendar.defaultProps = {
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
};
