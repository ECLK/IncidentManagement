import { events } from './events';
import { incidents } from './incidents';
import { reporters } from './reporters';
import { users } from './users';
import * as storage from '../utils/localStorage';

const uuidv4 = require('uuid/v4');

function getCurrentUser(){
    return storage.read("ECIncidentMangementUser").user;
}

export function getEvents(){
    
    return {
        status: "SUCCESS",
        data: [...events]
    };
};

export function addComment(incidentId, commentObj){
    const user = getCurrentUser();

    events.push({
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "COMMENTED",
        incidentId: incidentId,
        data: {
            comment: {
                body: commentObj.comment
            }
        },
        createdDate: Date()
    });
    return {
        status: "SUCCESS",
        message: "Commented",
        data: {
            
        }
    }
}

export function changeStatus(incidentId, status){
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    const oldStatus = incidents[incidentIndex].status;

    const user = getCurrentUser();

    if(oldStatus === status){
        return {
            status: "SUCCESS",
            message: "Status updated",
            data: {
                
            }
        };
    }
    
    incidents[incidentIndex].status = status;

    events.push({
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "ATTRIBUTE_CHANGED",
        affected_attribute: "STATUS",
        incidentId: incidentId,
        data: {
            status: {
                from_status_type: oldStatus,
                to_status_type: status
            }
        },
        createdDate: Date()
    });

    return {
        status: "SUCCESS",
        message: "Status updated",
        data: {
            
        }
    }
}

export function changeSeverity(incidentId, severity){
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    const oldSeverity = incidents[incidentIndex].severity;

    const user = getCurrentUser();

    if(oldSeverity === severity){
        return {
            status: "SUCCESS",
            message: "Severity updated",
            data: {
                
            }
        };
    }
    
    incidents[incidentIndex].severity = severity;

    events.push({
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "ATTRIBUTE_CHANGED",
        affected_attribute: "SEVERITY",
        incidentId: incidentId,
        data: {
            severity: {
                from_severity_type: oldSeverity,
                to_severity_type: severity
            }
        },
        createdDate: Date()
    });

    return {
        status: "SUCCESS",
        message: "Severity updated",
        data: {
            
        }
    }
}

export function getIncident(incidentID){
    let incident = incidents.find(inc => {
        return inc.id === incidentID;
    })

    return {
        status : 200,
        data: incident
    };
}

export function getIncidents(){

    return {
        status : 200,
        data: incidents
    };
};

export function createIncident(incidentData){
    const incident_id = uuidv4();
    const new_reporter_id = reporters[reporters.length -1].id + 1;
    reporters.push({
        id: new_reporter_id,
        name: "Anonymous"
    });

    incidents.push({
        id: incident_id,
        ref_ID: incidentData.ref_ID,
        user_ID: 0,
        title: incidentData.title,
        description: incidentData.description,
        occurrence: incidentData.occurrence,
        election: incidentData.election,
        category: incidentData.category,
        sub_category: incidentData.sub_category,
        info_channel: incidentData.info_channel,
        date: incidentData.date,
        reporter_id: new_reporter_id
    });

    events.push({
        initiator: {
            isAnonymous: true
        },
        action: "CREATED",
        incidentId: incident_id,
        created_date: Date()
    });

    return { 
        status: 200,
        data: {
            incident_id: incident_id,
            reporter_id: new_reporter_id
        }
    }
};

export function updateIncident(incidentId, incidentData){
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    incidents[incidentIndex] = incidentData;

    events.push({
        initiator: {
            isAnonymous: true
        },
        action: "GENERIC_UPDATE",
        incidentId: incidentData.id,
        created_date: Date()
    });

    return { status: 200 }
};

export function getReporter(reporterID){
    let reporter = reporters.find(rep => {
        return rep.id === reporterID;
    })

    return {
        status : 200,
        data: reporter
    };
};

export function updateReporter(reporterID, reporterData){
    const reporterIndex = reporters.findIndex(rep => rep.id === reporterID);
    reporters[reporterIndex] = reporterData;

    return { status: 200 }
};

export async function signIn(userName, password){
    if(users[userName]){
        return {
            user:users[userName],
            authenticated:true
        };
    }else{
        return {
            user:null,
            authenticated:false
        }
    }
}
