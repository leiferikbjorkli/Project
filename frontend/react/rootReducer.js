import {combineReducers} from 'redux';
import {Map, fromJS} from 'immutable';
import events from './reducers/eventsReducer';
import {reducer as formReducer} from 'redux-form';


let combineImmutableReducers = (reducers) => {
	let combined_reducers = combineReducers(reducers);
	return (state, action) => Map(combined_reducers(
		Map.isMap(state) ? state.toObject() : state,action
	))
};

const rootReducer = combineImmutableReducers({
	events: events,
	form: (state, action) => {
		const plainState = state ? state.toJS() : state;
		return fromJS(formReducer(plainState, action))
	}
});


export default rootReducer;
