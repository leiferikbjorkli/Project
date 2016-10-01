import React from 'react';
import {reduxForm} from 'redux-form';
import moment from 'moment';
import nb from 'moment/locale/nb';
import {fetchTagsIfNeeded} from './../../actions/tagsActions';
import {fetchGroupsIfNeeded} from './../../actions/groupsActions';
import {postEvent} from './../../actions/eventActions';
import validate from './../../validateForm';
import Select from 'react-select';
import DateTime from 'react-datetime';
import {getUserInfo} from './../../auth'

export const NewEventForm = React.createClass({
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
            <form onSubmit={this.props.handleSubmit(this.submit)}>
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
                    value={start_time.value}
                    defaultValue={start_time.initialValue}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH-mm"
                    isValidDate={(current) => {
                        return current.isAfter(moment().subtract(1, 'day'));
                    }}
                    onChange={(newValue) => start_time.onChange(newValue)}
                    inputProps={{placeholder:"Starttidspunkt"}}
                />
                {end_time.touched && end_time.error && <div>{end_time.error}</div>}
                <DateTime
                    name={end_time.name}
                    value={end_time.value}
                    defaultValue={end_time.initialValue}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH-mm"
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
                <input type='submit' value={this.props.submitText} />
            </form>
        </div>;
    },
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchTagsIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    },
    submit: function(values, dispatch) {
        const event = {
            title: values.title,
            description: values.description,
            location: values.location,
            startTime: values.start_time.local().format('YYYY-MM-DDTHH:mm:ss Z'),
            endTime: values.end_time.local().format('YYYY-MM-DDTHH:mm:ss Z'),
            tags: values.tags.map((tag) => tag.value),
            practiceGroups: values.groups.map((group) => group.label),
            contactPerson: values.contact_person
        };
        dispatch(postEvent(event));
    }
});

function mapStateToProps(state) {
    return {
        tags: state.getIn(['tags', 'items']),
        practiceGroups: state.getIn(['groups', 'items']),
        user: state.getIn(['user', 'user']),
        initialValues: {
            contact_person: getUserInfo().name
        }
    }
}

export default reduxForm({
    form: 'EventForm',
    fields: ['title', 'description', 'location', 'start_time', 'end_time', 'tags', 'groups', 'contact_person'],
    getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
    validate: validate
}, mapStateToProps)(NewEventForm);
