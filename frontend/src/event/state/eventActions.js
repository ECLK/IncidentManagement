import { createAction } from 'redux-starter-kit';
import * as eventApi from '../../api/events';

// Get events for a given incident ID
export const getIncidentEventsRequest = createAction('EVENT/GET_INCIDENT_EVENTS_REQUEST');
export const getIncidentEventsSuccess = createAction('EVENT/GET_INCIDENT_EVENTS_SUCCESS');
export const getIncidentEventsError = createAction('EVENT/GET_INCIDENT_EVENTS_ERROR');

export function getIncidentEvents(incidentId) {
    return async function(dispatch) {
        dispatch(getIncidentEventsRequest());
        try{
            const events = (await eventApi.getEvents(incidentId)).data;
            dispatch(getIncidentEventsSuccess(events));
        }catch(error){
            dispatch(getIncidentEventsError(error));
        }
    }
}