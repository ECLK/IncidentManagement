import produce from "immer"

import { 
    REQUEST_INCIDENT_EVENT_TRAIL, 
    REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_EVENT_TRAIL_FAILURE
} from './OngoingIncidents.types'

import { events } from '../../../data/events';

const initialState = {
    eventTrail: {
        data: [],
        isLoading:false,
        error: false,
    },
    events: []
}

export default function OngoingIncidentsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    return produce(state, draft => {
        switch (action.type) {
            case REQUEST_INCIDENT_EVENT_TRAIL:
                draft.eventTrail.isLoading = true;
                return draft;
            case REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS:
                draft.events = action.data;
            case REQUEST_INCIDENT_EVENT_TRAIL_FAILURE:
                draft.eventTrail.error = action.error;
        }
    })
}

