import React from 'react';
import moment from 'moment';
import nb from 'moment/locale/nb';
import {reduxForm} from 'redux-form';
import {fetchTagsIfNeeded} from './../../actions/tagsActions';
import {fetchEventsIfNeeded} from './../../actions/eventsActions';
import {fetchGroupsIfNeeded} from './../../actions/groupsActions';
import {setEventId, updateEvent, getEventInList} from './../../actions/eventActions';
import selectedEventSelector from './../../selectedEventSelector';
import validate from './../../validateForm';
import Select from 'react-select';
import DateTime from 'react-datetime';

export const EditEventForm = React.createClass({
    render: function () {
        moment.locale('nb', nb);
        const {fields: {title, description, location, start_time, end_time, tags, groups, contact_person}} = this.props;
        const tags_options = this.props.tags.map(tag => {
            return {
                value: tag,
                label: tag
            };
        }).toJS();
        const groups_options = this.props.practiceGroups.map(group => {
            return {
                value: group.id,
                label: group.name
            }
        }).toJS();
        return <div className="container">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                {title.touched && title.error && <div>{title.error}</div>}
                <input placeholder="Tittel" {...title}
                    className={title.touched && title.error && "error"} />
                {description.touched && description.error && <div>{description.error}</div>}
                <textarea placeholder="Beskrivelse" {...description}
                    className={description.touched && description.error && "error"} />
                {location.touched && location.error && <div>{location.error}</div>}
                <input placeholder="Sted" {...location}
                    className={location.touched && location.error && "error"}/>
                {start_time.touched && start_time.error && <div>{start_time.error}</div>}
                <DateTime
                    name={start_time.name}
                    value={moment(start_time.value).format('YYYY-MM-DD HH:mm')}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    isValidDate={(current) => {
                        return current.isAfter(moment().subtract(1, 'day'));
                    }}
                    onChange={(newValue) => start_time.onChange(newValue)}
                    inputProps={{placeholder:"Starttidspunkt"}}
                />
                {end_time.touched && end_time.error && <div>{end_time.error}</div>}
                <DateTime
                    name={end_time.name}
                    value={moment(end_time.value).format('YYYY-MM-DD HH:mm')}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    isValidDate={(current) => {
                        return current.isAfter(moment().subtract(1, 'day'));
                    }}
                    onChange={(newValue) => end_time.onChange(newValue)}
                    inputProps={{placeholder:"Slutttidspunkt"}}
                />
                {tags.touched && tags.error && <div>{tags.error}</div>}
                <Select multi
                        placeholder="Tagger"
                        name={tags.name}
                        value={tags.value}
                        options={tags_options}
                        allowCreate={true}
                        onChange={(newValue, selectedValues) => {
                            tags.onChange(selectedValues);
                        }}
                />
                {groups.touched && groups.error && <div>{groups.error}</div>}
                <Select multi
                        placeholder="Grupper"
                        name={groups.name}
                        value={groups.value}
                        options={groups_options}
                        onChange={(newValue, selectedValues) => {
                            groups.onChange(selectedValues);
                        }}
                />
                {contact_person.touched && contact_person.error && <div>{contact_person.error}</div>}
                <input placeholder="Kontaktperson" {...contact_person}
                    className={contact_person.touched && contact_person.error && "error"} />
                <input type='submit' value="Endre" />
            </form>
            <form onSubmit={this.props.handleSubmit(this.onDelete)}>
                <input type="submit" value="Slett"/>
            </form>
        </div>;
    },
    componentDidMount: function() {
        const {dispatch} = this.props;
        dispatch(fetchTagsIfNeeded());
        dispatch(fetchGroupsIfNeeded());
        dispatch(fetchEventsIfNeeded());
        dispatch(setEventId(this.props.params.id));
    },


    onSubmit: function(values, dispatch) {
        return this.submitEvent(values, dispatch, false);
    },
    onDelete: function(values, dispatch) {
        return this.submitEvent(values, dispatch, true);
    },
    submitEvent: function(values, dispatch, deleted) {
        const event = {
            title: values.title,
            description: values.description,
            location: values.location,
            startTime: values.start_time.local().format('YYYY-MM-DDTHH:mm:ss Z'),
            endTime: values.end_time.local().format('YYYY-MM-DDTHH:mm:ss Z'),
            tags: values.tags.map((tag) => tag.value),
            practiceGroups: values.groups.map((group) => group.label), 
            contactPerson: values.contact_person,
            deleted: deleted
        };
        dispatch(updateEvent(event, this.props.selectedEventId));
    }
});


function mapStateToProps(state) {
    const selectedEvent = selectedEventSelector(state);
    const mappedPracticeGroups = selectedEvent.get('practiceGroups').map(group => ({value: group, label: group})).toJS();
    const startTime = selectedEvent.get('startTime') ? moment(selectedEvent.get('startTime')) : '';
    const endTime = selectedEvent.get('endTime') ? moment(selectedEvent.get('endTime')) : '';
    return {
        selectedEventId: state.get('selectedEventId'),
        tags: state.getIn(['tags', 'items']),
        practiceGroups: state.getIn(['groups', 'items']),
        initialValues: {
            title:  selectedEvent.get('title'),
            description: selectedEvent.get('description'),
            location: selectedEvent.get('location'),
            start_time: startTime,
            end_time: endTime,
            tags: selectedEvent.get('tags').map(tag => ({value: tag, label:tag})).toJS(),
            groups: mappedPracticeGroups,
            contact_person: selectedEvent.get('contactPerson')
        }
    }
}

export default reduxForm({
    form: 'EventForm',
    fields: ['title', 'description', 'location', 'start_time', 'end_time', 'tags', 'groups', 'contact_person'],
    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
    validate: validate,
}, mapStateToProps)(EditEventForm);
