//utils for user behaviour

export const USER_ACTIONS = {
    CHANGE_ASSIGNEE: "CHANGE_ASSIGNEE",
    ESCALATE_INCIDENT: "ESCALATE_INCIDENT",
    CLOSE_INCIDENT: "CLOSE_INCIDENT",

    REVIEW_INCIDENTS: "REVIEW_INCIDENTS",
    VIEW_REPORTS: "VIEW_REPORTS",

    RUN_WORKFLOW: "RUN_WORKFLOW"
}

function findPermission(permissionList, permission){
    return permissionList.find(p => p === permission);;
}

export function userCan(user, incident, action){
    // constraints based rules

    // only the incident assignee can escalate incident
    if(action === USER_ACTIONS.ESCALATE_INCIDENT){
        if(incident.assignee && incident.assignee.uid === user.uid){
            return true;
        }
    }

    // admin super powers
    if(user.userName === "admin"){
        return true;
    }

    // hierarchy based rules
    if(action === USER_ACTIONS.CHANGE_ASSIGNEE){
        if(findPermission(user.userPermissions, "can_change_assignee")){
            return true;
        }
    }else if(action === USER_ACTIONS.CLOSE_INCIDENT){
        if(findPermission(user.userPermissions, "can_change_status")){
            return true;
        }
    }else if(action === USER_ACTIONS.REVIEW_INCIDENTS){
        if(findPermission(user.userPermissions, "CAN_REVIEW_INCIDENTS")){
            return true;
        }
    }else if(action === USER_ACTIONS.VIEW_REPORTS){
        if(findPermission(user.userPermissions, "can_view_incident_reports")){
            return true;
        }
    }else if(action === USER_ACTIONS.RUN_WORKFLOW){
        if(findPermission(user.userPermissions, "CAN_RUN_WORKFLOW")){
            return true;
        }
    }

    return false;
}