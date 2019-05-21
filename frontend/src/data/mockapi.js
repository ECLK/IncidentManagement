import { events } from './events';
import { incidents } from './incidents';

const uuidv4 = require('uuid/v4');

export function getEvents(){
    return {
        data: events
    };
};

export function addComment(commentObj){
    events.push({
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 3,
            displayname: "Achala Dissanayake"
        },
        action: "COMMENTED",
        incidentId: 1,
        data: {
            comment: {
                body: commentObj.comment
            }
        },
        created_date: Date(),
        approved_date: Date()
    });
};

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

export function addIncident(incidentData){
    const incident_id = uuidv4();
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
        date: incidentData.date
    });

    events.push({
        initiator: {
            isAnonymous: true
        },
        action: "CREATED",
        incidentId: incident_id,
        created_date: Date()
    });

    return { status: 200 }
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
