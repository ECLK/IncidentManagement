import {
  POST_INCIDENT_COMMENT,
  POST_INCIDENT_COMMENT_SUCCESS,
  POST_INCIDENT_COMMENT_ERROR,
  
  REQUEST_WORKFLOW_UPDATE,
  REQUEST_WORKFLOW_UPDATE_SUCCESS,
  REQUEST_WORKFLOW_UPDATE_ERROR,

  INCIDENT_ATTACH_FILE_REQUEST,
  INCIDENT_ATTACH_FILE_SUCCESS,
  INCIDENT_ATTACH_FILE_ERROR
} from "./OngoingIncidents.types";

import { postComment } from "../../api/comments";

import * as incidentAPI from "../../api/incident";

import { getIncidentEvents } from "../../event/state/eventActions";
import { loadIncident } from "../../incident/state/incidentActions";

export function postIncidentComment() {
  return {
    type: POST_INCIDENT_COMMENT
  };
}

export function postIncidentCommentSuccess(response) {
  return {
    type: POST_INCIDENT_COMMENT_SUCCESS,
    data: response,
    error: null,
    confirm: {
      message: "Comment posted"
    }
  };
}

export function postIncidentCommentError(errorResponse) {
  return {
    type: POST_INCIDENT_COMMENT_ERROR,
    data: null,
    error: errorResponse
  };
}

export function submitIncidentComment(incidentId, commentData) {
  return async function(dispatch) {
    dispatch(postIncidentComment());
    try {
      const response = await postComment(incidentId, commentData);
      dispatch(postIncidentCommentSuccess(response.data));
      dispatch(getIncidentEvents(incidentId));
    } catch (error) {
      dispatch(postIncidentCommentError(error));
    }
  };
}

export function updateWorkflow() {
  return {
    type: REQUEST_WORKFLOW_UPDATE,
    data: null,
    error: null,
    isLoading: true
  };
}

export function updateWorkflowSuccess() {
  return {
    type: REQUEST_WORKFLOW_UPDATE_SUCCESS,
    data: null,
    error: null,
    isLoading: false,
    confirm: {
      message: "Workflow action success!"
    }
  };
}

export function updateWorkflowError(error) {
  return {
    type: REQUEST_WORKFLOW_UPDATE_ERROR,
    data: null,
    error: error,
    isLoading: false
  };
}

export function fetchUpdateWorkflow(incidentId, workflowType, workflowUpdate) {
  return async function(dispatch) {
    dispatch(updateWorkflow());
    try {
      let response = await incidentAPI.updateIncidentWorkflow(
        incidentId,
        workflowType,
        workflowUpdate
      );
      dispatch(updateWorkflowSuccess());
      dispatch(loadIncident(incidentId))
      dispatch(getIncidentEvents(incidentId))
    } catch (error) {
      dispatch(updateWorkflowError(error));
    }
  };
}



export function attachFileRequest() {
  return {
      type: INCIDENT_ATTACH_FILE_REQUEST,
      data: null,
      error: null,
      isLoading: true
  }
}

export function attachFileSuccess(data) {
  return {
      type: INCIDENT_ATTACH_FILE_SUCCESS,
      data: data,
      error: null,
      isLoading: false,
      confirm: {
        message: "Media attached!"
      }
  }
}

export function attachFileError(error) {
  return {
      type: INCIDENT_ATTACH_FILE_ERROR,
      data: null,
      error: error,
      isLoading: false
  }
}

export function attachFile(incidentId, formData) {
  return async (dispatch) => {
      try{
          dispatch(attachFileRequest());
          let result = await incidentAPI.uploadFile(incidentId, formData)
          const mediaData = {
            "file_id_set": result.data.map(file => file.id)
          };
          result = await incidentAPI.attachMedia(incidentId, mediaData);
          dispatch(attachFileSuccess(result))
          dispatch(getIncidentEvents(incidentId))
      }catch(e){
          dispatch(attachFileError())
      }
  }
}
