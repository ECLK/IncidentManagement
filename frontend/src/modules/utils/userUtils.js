//utils for user behaviour

export const USER_ACTIONS = {
    CAN_RUN_WORKFLOW : "CAN_RUN_WORKFLOW",
    CAN_VERIFY_INCIDENT : "CAN_VERIFY_INCIDENT",
    CAN_CLOSE_INCIDENT : "CAN_CLOSE_INCIDENT",
    CAN_CHANGE_ASSIGNEE : "CAN_CHANGE_ASSIGNEE",
    CAN_ESCALATE_INCIDENT : "CAN_ESCALATE_INCIDENT",
    CAN_ESCALATE_EXTERNAL : "CAN_ESCALATE_EXTERNAL",
    CAN_INVALIDATE_INCIDENT : "CAN_INVALIDATE_INCIDENT",
    CAN_REOPEN_INCIDENT: "CAN_REOPEN_INCIDENT",

    CAN_REVIEW_INCIDENTS: "CAN_REVIEW_INCIDENTS",
    CAN_REVIEW_ALL_INCIDENTS: "CAN_REVIEW_ALL_INCIDENTS",
    CAN_REVIEW_OWN_INCIDENTS: "CAN_REVIEW_OWN_INCIDENTS",
    VIEW_REPORTS: "VIEW_REPORTS",

    CAN_VIEW_REPORTS: "CAN_VIEW_REPORTS"
}

function findPermission(permissionList, permission){
    for(var perm of permissionList){
        if(perm === permission){
            return true;
        }
    }
    return false;
}

export function userCan(user, incident, action){
    // constraints based rules

    // only the incident assignee can escalate incident
    if(action === USER_ACTIONS.ESCALATE_INCIDENT){
        if(incident && incident.assignee && incident.assignee.uid === user.uid){
            return true;
        }
    }

    // admin super powers
    if(user.userName === "admin"){
        return true;
    }

    if(!action){
        return false;
    }

    return findPermission(user.userPermissions, action.toString());

    // return false;
}