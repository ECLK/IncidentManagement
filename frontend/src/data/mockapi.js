import * as storage from "../utils/localStorage";

import { districts, divisionalSecretariats, gramaNiladharis, provinces } from "./locations";
import { police_divisions, police_stations } from "./police";
import { polling_divisions, polling_stations } from "./polling";

import { elections } from "./elections";
import { events } from "./events";
import { incidents } from "./incidents";
import { institutions } from "./institutions"
import moment from "moment";
import { reporters } from "./reporters";
import { users } from "./users";

const uuidv4 = require("uuid/v4");


export function getElections() {
    return {
        status: 200,
        data: elections.filter((election) => { return election.status == true; }) // send only the active elections
    };
}

export function getInstitutions() {
    return {
        status: 200,
        data: institutions
    }
}

export function getProvinces() {
    return {
        status: 200,
        data: provinces
    };
}

export function getDistricts() {
    return {
        status: 200,
        data: districts
    };
}

export function getDivisionalSecretariats() {
    return {
        status: 200,
        data: []
    };
}

export function getGramaNiladharis() {
    return {
        status: 200,
        data: []
    }
}

export function getPollingStations() {
    return {
        status: 200,
        data: []
    };
}

export function getPollingDivisions() {
    return {
        status: 200,
        data: []
    };
}


export function getPoliceStations() {
    return {
        status: 200,
        data: []
    }
}

export function getPoliceDivisions() {
    return {
        status: 200,
        data: []
    }
}

function getCurrentUser() {
    return storage.read("ECIncidentMangementUser").user;
}

export function getEvents(incidentId = 1) {
    const incidentEvents = events.filter(e => e.incidentId === incidentId);
    return {
        status: "SUCCESS",
        data: [...incidentEvents]
    };
}

export function addComment(incidentId, commentObj) {
    const user = getCurrentUser();

    var action = "COMMENTED";
    if (commentObj.isOutcome) {
        action = "OUTCOME_ADDED";
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
        data: {}
    };
}

export function resolveEvent(eventId, decision) {
    const user = getCurrentUser();
    const eventIdx = events.findIndex(e => e.id === eventId);
    const prevEvent = events[eventIdx];
    const incidentId = prevEvent.incidentId;
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);

    incidents[incidentIndex].hasPendingStatusChange = false;
    prevEvent.isResolved = true;

    if (decision === "APPROVE") {
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
            data: {},
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
    } else if ((decision = "REJECT")) {
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
            data: {},
            linked_event_id: eventId,
            createdDate: Date()
        });
    }

    return {
        status: "SUCCESS",
        message: "Event updated",
        data: {}
    };
}

export function getIncident(incidentID) {
    let incident = incidents.find(inc => {
        return inc.id === incidentID;
    });

    return {
        status: 200,
        data: incident
    };
}

const PAGE_SIZE = 2;
export function getIncidents(filters, pageNumber = 1) {
    let filteredIncidents = [...incidents];
    let { textSearch } = filters;
    textSearch = textSearch.toLowerCase();
    if (textSearch) {
        let refIds = []
            .concat(
                filteredIncidents
                    .filter(({ refId }) => refId === textSearch)
                    .map(({ refId }) => refId)
            )
            .concat(
                filteredIncidents
                    .filter(
                        ({ description }) =>
                            description && description.toLowerCase().includes(textSearch)
                    )
                    .map(({ refId }) => refId)
            )
            .concat(
                filteredIncidents
                    .filter(
                        ({ locationName }) =>
                            locationName && locationName.toLowerCase().includes(textSearch)
                    )
                    .map(({ refId }) => refId)
            )
            .concat(
                filteredIncidents
                    .filter(
                        ({ title }) => title && title.toLowerCase().includes(textSearch)
                    )
                    .map(({ refId }) => refId)
            );

        filteredIncidents = filteredIncidents.filter(({ refId }) =>
            refIds.includes(refId)
        );
    }

    if (filters.severity) {
        filteredIncidents = filteredIncidents.filter(
            ({ severity }) => severity === filters.severity
        );
    }

    if (filters.status) {
        filteredIncidents = filteredIncidents.filter(
            ({ status }) => status === filters.status
        );
    }

    if (filters.category) {
        filteredIncidents = filteredIncidents.filter(
            ({ subCategory }) => subCategory === filters.category
        );
    }

    if (filters.maxResponseTime) {
        filteredIncidents = filteredIncidents.filter(
            ({ responseTimeInHours }) =>
                responseTimeInHours <= filters.maxResponseTime
        );
    }

    if (filters.startTime) {
        filteredIncidents = filteredIncidents.filter(({ createdDate }) =>
            moment(createdDate).isAfter(filters.startTime)
        );
    }
    if (filters.endTime) {
        filteredIncidents = filteredIncidents.filter(({ createdDate }) =>
            moment(createdDate).isBefore(filters.endTime)
        );
    }

    let pages = Math.round(filteredIncidents.length / PAGE_SIZE);
    let currentPageStartItemIndex = (pageNumber - 1) * PAGE_SIZE;
    let currentPageEndItemIndex = currentPageStartItemIndex + PAGE_SIZE;
    return {
        status: 200,
        data: {
            pages: pages,
            pageNumber,
            incidents: filteredIncidents.slice(
                currentPageStartItemIndex,
                currentPageEndItemIndex
            )
        }
    };
}

export function createIncident(incidentData) {
    const user = getCurrentUser();
    const incident_id = uuidv4();

    const new_reporter_id = reporters[reporters.length - 1].id + 1;

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
        severity: "DEFAULT",
        assignees: []
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
    };
}

export function updateIncident(incidentId, incidentData) {
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

    return { status: 200 };
}

export function getReporter(reporterID) {
    let reporter = reporters.find(rep => {
        return rep.id === reporterID;
    });

    return {
        status: 200,
        data: reporter
    };
}

export function updateReporter(reporterID, reporterData) {
    const reporterIndex = reporters.findIndex(rep => rep.id === reporterID);
    reporters[reporterIndex] = reporterData;

    return {
        status: 200,
        data: {}
    };
}

export async function signIn(userName, password) {
    const user = users.findIndex(user => user.userName === userName);

    if (user === -1) {
        return {
            user: null,
            authenticated: false
        };
    }

    return {
        user: users[user],
        authenticated: true
    };
}

export function assignToIncident(incidentId, uid) {
    const user = getCurrentUser();
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    const assignee = users.findIndex(user => user.uid === uid);

    incidents[incidentIndex].assignees[0] = {
        displayName: users[assignee].displayName,
        uid: users[assignee].uid
    };

    events.push({
        id: uuidv4(),
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "ENTITY_ASSIGNED",
        incidentId: incidentId,
        data: {
            user: users[assignee]
        },
        createdDate: Date()
    });

    return {
        status: 200,
        data: {}
    };
}

export function removeFromIncident(incidentId, uid) {
    const user = getCurrentUser();
    const incidentIndex = incidents.findIndex(inc => inc.id === incidentId);
    const assignee = users.findIndex(user => user.uid === uid);

    incidents[incidentIndex].assignees = incidents[
        incidentIndex
    ].assignees.filter(user => user.uid != uid);

    events.push({
        id: uuidv4(),
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: user.uid,
            displayname: user.displayName
        },
        action: "ENTITY_REMOVED",
        incidentId: incidentId,
        data: {
            user: users[assignee]
        },
        createdDate: Date()
    });

    return {
        status: 200,
        data: {}
    };
}

export function getUsers() {
    return {
        status: "SUCCESS",
        data: [...users]
    };
}

export function escallateIncident(incidentId, assigneeId) {
    assignToIncident(incidentId, assigneeId + 1);
    var incident = getIncident(incidentId);
    return incident;
}
