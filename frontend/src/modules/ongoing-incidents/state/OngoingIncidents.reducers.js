import produce from "immer";

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
  REQUEST_ALL_INCIDENTS,
  REQUEST_ALL_INCIDENTS_SUCCESS,
  REQUEST_ALL_INCIDENTS_ERROR,
  REQUEST_ALL_USERS_SUCCESS,
  INCIDENT_SEARCH_FILTERS_UPDATE,
  INCIDENT_SEARCH_FILTERS_RESET
} from "./OngoingIncidents.types";
import moment from "moment";

import { events } from "../../../data/events";

const initialState = {
  eventTrail: {
    data: [],
    isLoading: false,
    error: false
  },
  events: [],
  pagedIncidents: {
    incidents: [],
    pages: 1,
    pageNumber: 1
  },
  users: [],
  incidentSearchFilter: {
    status: "",
    maxResponseTime: "",
    severity: "",
    startDate: moment(new Date())
      .subtract(1, "year")
      .format(moment.HTML5_FMT.DATE),
    endDate: moment(new Date()).format(moment.HTML5_FMT.DATE),
    startTime: moment(new Date()).format(moment.HTML5_FMT.TIME),
    endTime: moment(new Date()).format(moment.HTML5_FMT.TIME)
  }
};

export default function OngoingIncidentsReducer(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }
  return produce(state, draft => {
    switch (action.type) {
      case REQUEST_INCIDENT_EVENT_TRAIL:
        draft.eventTrail.isLoading = true;
        return draft;

      case REQUEST_INCIDENT_EVENT_TRAIL_SUCCESS:
        draft.events = action.data;
        return draft;

      case REQUEST_INCIDENT_EVENT_TRAIL_ERROR:
        draft.eventTrail.error = action.error;
        return draft;

      case REQUEST_ALL_INCIDENTS_SUCCESS:
        draft.pagedIncidents = action.data;
        return draft;

      case REQUEST_ALL_USERS_SUCCESS:
        draft.users = action.data;
        return draft;
      case INCIDENT_SEARCH_FILTERS_UPDATE:
        draft.incidentSearchFilter = action.data;
        return draft;

      case INCIDENT_SEARCH_FILTERS_RESET:
        draft.incidentSearchFilter = initialState.incidentSearchFilter;
        return draft;
    }
  });
}
