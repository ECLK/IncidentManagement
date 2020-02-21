import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import * as moment from 'moment';
import Button from '@material-ui/core/Button';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';

import { showModal } from '../../../modals/state/modal.actions'
import { API_BASE_URL } from '../../../config';
import FilePreviewer from '../../../files/components/FilePreviewer/FilePreviewer';


const styles = {
    truncate: {
        width: "100%",
        whiteSpace: 'wrap',
        display:'flex',
        justifyContent:'space-between'
    },
    eventItem: {
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        display: "flex",
        padding: "0px 0px 0px 0px",
        flexDirection: "column"
    },
    eventItemOutcome: {
        backgroundColor: "#fff",
        border: "2px solid #53AF72",
        display: "flex",
        padding: "0px 0px 0px 0px",
        flexDirection: "column"
    },
    eventItemDetails: {
        display: "flex",
        padding: "10px 5px 10px 5px",
        backgroundColor: "#4241410d"
    },
    eventItemAvatar: {
        width: "25px",
        height: "25px",
        marginLeft: "5px"
    },
    eventItemUserDetails: {
        marginLeft: "10px",
        marginRight: "10px",
        lineHeight: "35px",
        width: '100%'
    },
    eventItemBody: {
        width: "100%",
        padding: "10px 10px 10px 10px",
        borderTop: "1px solid #ccc"
    },
    eventItemActions: {
        marginLeft: 'auto'
    }
};


function getActionText(event){
    switch(event.action){
        case "GENERIC_UPDATE":
            return "edited incident information";
        case "COMMENTED":
            return "commented on the incident";
        case "OUTCOME_ADDED":
            return "added new outcome for the incident";
        case "MEDIA_ATTACHED":
            return "attached media";
        case "CREATED":
            return ` created the incident`
        case "WORKFLOW_ACTIONED":
                if(!event.data){
                    return "unknown workflow action";
                }

                switch(event.data.workflow.type){
                    case "Verify":
                        return "verified the incident";
                    
                    case "Escalate External":
                        return "escallated the incident to an outside entity";

                    case "Complete Action":
                            return "provided action";

                    case "Request Advice":
                            return "requested advice";

                    case "Provide Advice":
                            return "provided advice";

                    case "Assign":
                            return `assigned ${event.data.workflow.data.assignee} to the incident`;

                    case "Escalate":
                        return `escalated the incident to ${event.data.workflow.data.assignee}`

                    case "Close":
                        return `closed the incident`

                    case "Invalidate":
                        return `invalidated the incident`

                    case "Reopen":
                        return `reopened the incident`
                }
        default:
            return "unknown action"
    }
}


function hasEventBody(event){
    const actionsWithBody = [
        "COMMENTED",
        "OUTCOME_ADDED",
        "ATTRIBUTE_CHANGED",
        "MEDIA_ATTACHED",
        "WORKFLOW_ACTIONED"
    ];

    return actionsWithBody.indexOf(event.action) !== -1;
}


function getSecondaryItem(event){
    if(event.action === "COMMENTED" || event.action === "OUTCOME_ADDED"){
        return (
            <div>
                { ReactHtmlParser(event.data.comment.body)}
            </div>
        )
    }else if(event.action === "MEDIA_ATTACHED"){
        const file = event.data.media.file;
        return (
            <div>
                <FilePreviewer 
                    url={`${API_BASE_URL}/incidents/files/download/${file.id}`}
                    filename={file.name}
                    ext={file.extension}
                />
            </div>
        )
    }else if(event.action === "WORKFLOW_ACTIONED"){
        const workflowType = event.data.workflow.type;
        const workflowData = event.data.workflow.data;

        if(workflowType === "Verify"){
            return (
                <div><b>Has Proof?</b> <br /> 
                    {workflowData.hasProof ? "Yes" : "No"}
                </div>
            )
        }else if(workflowType === "Escalate External"){
            return (
                <div>
                    <div><b>Entity:</b><br/> {workflowData.entity.type}</div><br/>
                    <div><b>Name:</b><br/> {workflowData.entity.name}</div><br/>
                    <div><b>Comment:</b><br/> {workflowData.comment}</div>
                </div>
            )
        }else if(workflowType === "Complete Action"){
            return (
                <div>
                    {workflowData.comment}
                </div>
            )
        }else if(workflowType === "Request Advice"){
            return (
                <div>
                    {workflowData.comment}
                </div>
            )
        }else if(workflowType === "Provide Advice"){
            return (
                <div>
                    {workflowData.comment}
                </div>
            )
        }else if(workflowType === "Assign"){
            return (
                <div>
                    N/A
                </div>
            )
        }else if(workflowType === "Escalate"){
            return (
                <div>
                    <div><b>Comment:</b><br/> {workflowData.comment}</div>
                    <div><b>Response Time:</b><br/> {workflowData.responseTime} hours</div>
                </div>
            )
        }else if(workflowType === "Close"){
            return (
                <div>
                    <div><b>Assignee(s)/ contact point(s):</b><br/> {workflowData.assignees}</div><br/>
                    <div><b>Name of external entities /internal entities:</b><br /> {workflowData.entities}</div><br/>
                    <div><b>Department(s), if any:</b><br /> {workflowData.departments}</div><br/>
                    <div><b>Name of individual(s), if any:</b><br /> {workflowData.individuals}</div><br/>
                    <div><b>Additional remarks:</b><br /> {workflowData.remark}</div>
                </div>
            )
        }else if(workflowType === "Invalidate"){
            return (
                <div>
                    {workflowData.comment}
                </div>
            )
        }else if(workflowType === "Reopen"){
            return (
                <div>
                    {workflowData.comment}
                </div>
            )
        }
    }
    return (<></>);
}

function hasPendingAction(event){
    return event.action === "WORKFLOW_ACTIONED" &&
            event.data.workflow.type === "Escalate External" &&
            !event.data.workflow.data.isCompleted;
}

function hasPendingAdvice(event){
    return event.action === "WORKFLOW_ACTIONED" &&
            event.data.workflow.type === "Request Advice" &&
            !event.data.workflow.data.isCompleted;
}


function getDateDiff(event){
    return moment(event.createdDate).format("hh:mm A YYYY-MM-DD");
}


const EventItemView = ({ event, classes }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state)=>(state.user));

    let initiator = "Public User";
    if(event.initiator && event.initiator.userName !== "guest"){
        initiator = event.initiator.displayname;
    }

    let initiatorData = userData.users.byIds[event.initiator.uid];

    return (
    <li className={event.action==='OUTCOME_ADDED'? classes.eventItemOutcome : classes.eventItem}>
        <div className={classes.eventItemDetails}>
            <Chip label={!!(initiatorData) ? initiatorData.entity.name : ""} className={classes.chip} variant="outlined" />
            <div className={classes.eventItemUserDetails}>
                <div className={classes.truncate}>
                    {/* left end */}
                    <div> 
                        <strong>
                            {initiator}
                        </strong>{' '}
                        {getActionText(event)}
                        <span> ({getDateDiff(event)})</span>
                    </div>
                    {/* right end */}
                    { event.action==='OUTCOME_ADDED' && <PlaylistAddCheck/>}
                </div>

                {
                    hasPendingAction(event) && (
                        <div className={classes.eventItemActions}>
                            <Button 
                                color="primary"
                                className={classes.button} 
                                onClick={() => {
                                    dispatch(
                                        showModal(
                                            'COMPLETE_OUTSIDE_ACTION_MODAL',
                                            {incidentId:event.incident.id, startEventId:event.id }
                                            )
                                        )
                                    }
                                }
                            >
                                Complete Action
                            </Button>
                        </div>
                    )
                }

                {hasPendingAdvice(event) && 
                 (
                    <div className={classes.eventItemActions}>
                        <Button 
                            color="primary" 
                            className={classes.button} 
                            onClick={() => dispatch(showModal(
                                            'PROVIDE_ADVICE_MODAL', 
                                            {  event }))}
                        >
                            Provide Advice
                        </Button>
                    </div>
                )}
            </div>
        </div>
        { hasEventBody(event) && (
            <div className={classes.eventItemBody}>
                {getSecondaryItem(event)}
            </div>    
        )}        
    </li>
)};


const EventItem = withStyles(styles)(EventItemView);
export default EventItem;