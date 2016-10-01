import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import EventList from './EventList.jsx';
import EventCalendar from './EventCalendar.jsx';
import EventViewPicker from './../PresentationalComponents/EventViewPicker.jsx';
import { mobileBreakPoint } from './../../constants.js';
import NewEventLink from './../PresentationalComponents/NewEventLink.jsx';


class EventListOrEventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: props.viewType,
    };
    this.switchView = this.switchView.bind(this);
  }
  setView() {
    return (this.state.viewType === 'list' || window.innerWidth < mobileBreakPoint)
      ?
      <EventList
        events={this.props.events}
        activeFilter={this.props.activeFilter}
      />
      :
      <EventCalendar
        events={this.filterEvents(this.props.events)}
      />;
  }
  switchView(viewType) {
    if (viewType !== this.state.viewType) {
      this.setState({ viewType });
    }
  }
  filterEvents(events) {
    return events.filter((event) => (
      this.props.activeFilter.isSubset(event.tags)
    ));
  }
  generateViewPicker() {
    return (window.innerWidth >= mobileBreakPoint)
      ?
      <EventViewPicker
        onClick={this.switchView}
        selectedViewType={this.state.viewType}
      />
      :
      '';
  }

  render() {
    return (
      <div className="events">
        <NewEventLink />
        {this.generateViewPicker()}
        {this.setView()}
      </div>
    );
  }
}

EventListOrEventCalendar.propTypes = {
  viewType: PropTypes.string.isRequired,
  events: PropTypes.object.isRequired,
  activeFilter: PropTypes.object.isRequired,
};

EventListOrEventCalendar.defaultProps = {
  viewType: 'calendar',
};


function mapStateToProps(state) {
  return {
    events: state.getIn(['events', 'items']),
    activeFilter: state.get('activeFilter'),
  };
}

export default connect(mapStateToProps)(EventListOrEventCalendar);
