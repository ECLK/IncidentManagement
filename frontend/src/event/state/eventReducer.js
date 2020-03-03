//Event Reducers
import { createReducer } from 'redux-starter-kit';
import { getIncidentEvents, getIncidentEventsSuccess } from './eventActions';

const initialState = {
    events: {
        byIds:{},
        allIds:[]
    }
}

const eventReducer = createReducer(initialState, {
    [getIncidentEventsSuccess] : (state, action) => {
        const _byIds = {};
        const _allIds = [];
        for(var event of action.payload){
            _byIds[event.id] = event;
            _allIds.push(event.id);
        }
        state.events.allIds = _allIds;
        state.events.byIds = _byIds;
    }
});

export default eventReducer;

