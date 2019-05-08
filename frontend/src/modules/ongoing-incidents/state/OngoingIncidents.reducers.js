import produce from "immer"

import { 
    REQUEST_INCIDENT_COMMENT_TRAIL, 
    REQUEST_INCIDENT_COMMENT_TRAIL_SUCCESS, 
    REQUEST_INCIDENT_COMMENT_TRAIL_FAILURE
} from './OngoingIncidents.types'

const initialState = {
    commentTrail: {
        data: [],
        isLoading:false,
        error: false,
    }

}

export default function OngoingIncidentsReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }
    return produce(state, draft => {
        switch (action.type) {
            case REQUEST_INCIDENT_COMMENT_TRAIL:
                draft.commentTrail.isLoading = true;
                return draft;
            case REQUEST_INCIDENT_COMMENT_TRAIL_SUCCESS:
                draft.commentTrail.data = action.data;
            case REQUEST_INCIDENT_COMMENT_TRAIL_FAILURE:
                draft.commentTrail.error = action.error;
        }
    })
}

