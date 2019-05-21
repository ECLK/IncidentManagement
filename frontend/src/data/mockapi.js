import { events } from './events';

export function getEvents(){
    return {
        status: "SUCCESS",
        data: [...events]
    };
}

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
    events.push({
        initiator: {
            isAnonymous: false,
            avatar: "",
            userId: 1,
            displayname: "Manujith Pallewatte"
        },
        action: "ATTRIBUTE_CHANGED",
        affected_attribute: "STATUS",
        incidentId: incidentId,
        data: {
            status: {
                from_status_type: "NEW",
                to_status_type: status
            }
        },
        createdDate: Date()
    });
    console.log(events);
    return {
        status: "SUCCESS",
        message: "Status updated",
        data: {
            
        }
    }
}