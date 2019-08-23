//utils for user behaviour

export const USER_ACTIONS = {
    CHANGE_ASSIGNEE: "CHANGE_ASSIGNEE",
    ESCALATE_INCIDENT: "ESCALATE_INCIDENT",
    CLOSE_INCIDENT: "CLOSE_INCIDENT"
}

function findPermission(permissionList, permission){
    return permissionList.find(p => p.codename === permission);;
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
    }

    return false;
}