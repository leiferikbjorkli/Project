import {combineReducers} from 'redux';
import {Map, fromJS} from 'immutable';
import expanded from './reducers/expandedReducer';
import tags from './reducers/tagsReducer';
import events from './reducers/eventsReducer';
import activeFilter from './reducers/activeFilterReducer';
import groups from './reducers/groupsReducer';
import selectedEventId from './reducers/eventReducer'
import {reducer as formReducer} from 'redux-form';


let combineImmutableReducers = (reducers) => {
	let combined_reducers = combineReducers(reducers);
	return (state, action) => Map(combined_reducers(
		Map.isMap(state) ? state.toObject() : state,action
	))
};

const rootReducer = combineImmutableReducers({
	selectedEventId: selectedEventId,
	expanded: expanded,
	activeFilter: activeFilter,
    tags: tags,
	events: events,
	groups: groups,
	form: (state, action) => {
		const plainState = state ? state.toJS() : state;
		return fromJS(formReducer(plainState, action))
	}
});


export default rootReducer;
