import { events } from './events';
import { incidents } from './incidents';
import { reporters } from './reporters';
import { users } from './users';
import { ds_divisions } from './ds_divisions';
import { polling_divisions } from './polling_divisions';
import * as storage from '../utils/localStorage';
import * as auth from '../utils/authorization';

const uuidv4 = require('uuid/v4');

function getCurrentUser(){
    return storage.read("ECIncidentMangementUser").user;
}

export function getEvents(){
    
    return {
        status: "SUCCESS",
        data: [...events]
    }
}

export function addComment(incidentId, commentObj){
    const user = getCurrentUser();

    var action = "COMMENTED";
    if(commentObj.isOutcome){
        action = "OUTCOME_ADDED"
    }

    events.push({
        id: uuidv4(),
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: action,
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

    if(auth.canChangeStatus(user) === "CAN_WITH_APPROVAL"){
        incidents[incidentIndex].hasPendingStatusChange = true;

        events.push({
            id: uuidv4(),
            initiator: {
                isAnonymous: false,
                avatar: "",
                userId: user.uid,
                displayname: user.displayName
            },
            action: "ATTRIBUTE_CHANGE_REQUESTED",
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
    }else if(auth.canChangeStatus(user) === "CAN"){
        incidents[incidentIndex].status = status;

        events.push({
            id: uuidv4(),
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
    }

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
        id: uuidv4(),
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

export function resolveEvent(eventId, decision){
    const user = getCurrentUser();
    const eventIdx = events.findIndex(e => e.id === eventId);
    const prevEvent = events[eventIdx];
    const incidentId = prevEvent.incidentId;
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);

    incidents[incidentIndex].hasPendingStatusChange = false;
    prevEvent.isResolved = true;

    if(decision === "APPROVE"){
        incidents[incidentIndex].status = prevEvent.data.status.to_status_type;
        
        events.push({
            id: uuidv4(),
            initiator: {
                isAnonymous: false,
                avatar: "",
                userId: user.uid,
                displayname: user.displayName
            },
            action: "ATTRIBUTE_CHANGE_APPROVED",
            affected_attribute: "STATUS",
            incidentId: incidentId,
            data: {
            },
            linked_event_id: eventId,
            createdDate: Date()
        });

        events.push({
            id: uuidv4(),
            initiator: {
                isAnonymous: false,
                avatar: "",
                userId: prevEvent.initiator.userId,
                displayname: prevEvent.initiator.displayname
            },
            action: "ATTRIBUTE_CHANGED",
            affected_attribute: "STATUS",
            incidentId: incidentId,
            data: {
                status: {
                    from_status_type: prevEvent.data.status.from_status_type,
                    to_status_type: prevEvent.data.status.to_status_type
                }
            },
            createdDate: Date()
        });
    }else if(decision = "REJECT"){
        events.push({
            id: uuidv4(),
            initiator: {
                isAnonymous: false,
                avatar: "",
                userId: user.uid,
                displayname: user.displayName
            },
            action: "ATTRIBUTE_CHANGE_REJECTED",
            affected_attribute: "STATUS",
            incidentId: incidentId,
            data: {
            },
            linked_event_id: eventId,
            createdDate: Date()
        });
    }

    return {
        status: "SUCCESS",
        message: "Event updated",
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
        data: [...incidents]
    };
};

export function createIncident(incidentData){
    console.log(incidentData);
    const user = getCurrentUser();
    const incident_id = uuidv4();

    const new_reporter_id = reporters[reporters.length -1].id + 1;

    var reporter = {
        id: new_reporter_id,
        name: "Anonymous"
    };

    reporters.push(reporter);

    var incident = {
        id: incident_id,
        refId: "00000",
        userId: user.uid,
        title: incidentData.title,
        description: incidentData.description,
        occurrence: incidentData.occurrence,
        election: incidentData.election,
        category: incidentData.category,
        subCategory: incidentData.sub_category,
        infoChannel: incidentData.info_channel,
        date: incidentData.date,
        reporterId: new_reporter_id,
        status: "NEW",
        severity: "DEFAULT"
    };
    incidents.push(incident);
    
    events.push({
        id: uuidv4(),
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "CREATED",
        incidentId: incident_id,
        created_date: Date()
    });

    return { 
        status: 200,
        data: {
            incident: incident,
            reporter: reporter
        }
    }
};

export function updateIncident(incidentId, incidentData){
    const user = getCurrentUser();
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    incidents[incidentIndex] = incidentData;

    events.push({
        id: uuidv4(),
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
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

export function getDSDivisions(){

    return {
        status : 200,
        data: ds_divisions
    };
};

export function getPollingDivisions(){

    return {
        status : 200,
        data: polling_divisions
    };
};
