function canChangeStatus(user){
    if(user.role === "EC_MEMBER"){
        return "CANT"
    }
    if(user.role === "COMPLAINT_COORDINATOR"){
        return "CAN_WITH_APPROVAL"
    }
    if(user.role === "COMPLAINT_MANAGER" || user.role === "CHIEF_COMPLAINT_COORDINATOR"){
        return "CAN"
    }
}

function canApproveChangeStatus(user){
    if(user.role === "CHIEF_COMPLAINT_COORDINATOR"){
        return true;
    }
    return false;
}

export {
    canChangeStatus,
    canApproveChangeStatus
}