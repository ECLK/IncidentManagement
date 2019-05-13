import { events } from './events';

export function getEvents(){
    return {
        data: events
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
        created_date: Date(),
        approved_date: Date()
    });
}