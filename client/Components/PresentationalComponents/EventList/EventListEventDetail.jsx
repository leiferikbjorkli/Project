import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {setEventId} from './../../../actions/eventActions';
import moment from 'moment';

export const EventDetail = React.createClass({
    render: function() {
        const start = moment(this.props.event.startTime);
        const end = moment(this.props.event.endTime);

        const formatDates = (s, e) => {
            let date = start.format('D. MMM');
            const startTime = start.format('HH.mm');
            const endDate = end.format('D. MMM');
            const endTime = end.format('HH.mm');

            if(date == endDate) {
                date += ' kl ' + startTime + ' - ' + endTime;
            } else {
                date += ' kl ' + startTime + ' - ' + endDate + ' kl ' + endTime;
            }
            return date;
        };

        const description = this.props.event.description;
        const tags = this.props.event.tags ? this.props.event.tags : [];

        return <div className='eventList-event-right'>
            <div className='eventList-event-date'>{formatDates(start, end)}</div>
            <div className='float-wrapper'>
                <div className='eventList-event-location'>{this.props.event.location}</div>
                <div className='eventList-event-contact'>{this.props.event.contactPerson}</div>
            </div>
            <div className='eventList-event-title'>
                <Link to={`/edit/${this.props.event.id}`} onClick={() => {this.props.dispatch(setEventId(this.props.event.id))}}>{this.props.event.title}</Link>
            </div>
            <div className='eventList-event-description' dangerouslySetInnerHTML={{__html: description}}></div>
            <div className='eventList-event-tags'>
                <ul>
                {tags.map(tag => {
                    return <li key={tag}>{tag}</li>
                })}
                </ul>
            </div>
        </div>;
    }
});

export default connect()(EventDetail);
