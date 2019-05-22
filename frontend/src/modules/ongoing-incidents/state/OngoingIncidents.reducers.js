import produce from "immer"

import { 
    REQUEST_INCIDENT_EVENT_TRAIL, 
    REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_EVENT_TRAIL_ERROR,

    POST_INCIDENT_COMMENT,
    POST_INCIDENT_COMMENT_SUCCESS,
    POST_INCIDENT_COMMENT_ERROR,

    CHANGE_INCIDENT_STATUS,
    CHANGE_INCIDENT_STATUS_SUCCESS,
    CHANGE_INCIDENT_STATUS_ERROR,

    RESOLVE_EVENT_APPROVAL,
    RESOLVE_EVENT_APPROVAL_SUCCESS,
    RESOLVE_EVENT_APPROVAL_ERROR,
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
            case REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS:
                draft.events = action.data;
            case REQUEST_INCIDENT_EVENT_TRAIL_ERROR:
                draft.eventTrail.error = action.error;
        }
    })
}

