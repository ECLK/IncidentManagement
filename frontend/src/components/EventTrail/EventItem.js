import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';
import * as moment from 'moment';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import Button from '@material-ui/core/Button';

const styles = {
    truncate: {
        width: "100%",
        whiteSpace: 'wrap'
    },
    eventItem: {
        backgroundColor: "#fff",
        marginBottom: "10px",
        border: "1px solid #ccc",
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
        lineHeight: "25px"
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
        case "ATTRIBUTE_CHANGED":
            switch(event.affected_attribute){
                case "STATUS":
                    return `changed the status from ${event.data.status.from_status_type} 
                                to ${event.data.status.to_status_type}`;
                case "SEVERITY":
                    return `changed the severity from ${event.data.severity.from_severity_type} 
                                to ${event.data.severity.to_severity_type}`;
            }
        case "ATTRIBUTE_CHANGE_REQUESTED":
            switch(event.affected_attribute){
                case "STATUS":
                    return `requested to change the status from ${event.data.status.from_status_type} 
                                to ${event.data.status.to_status_type}`;
            }
        case "ATTRIBUTE_CHANGE_APPROVED":
            return "approved requested change";
        case "ATTRIBUTE_CHANGE_REJECTED":
            return "rejected requested change";
        case "COMMENTED":
            return "commented on the incident";
        case "OUTCOME_ADDED":
            return "added new outcome for the incident";
        case "MEDIA_ATTACHED":
            return "attached media";
    }
}

function hasEventBody(event){
    if(event.action === "COMMENTED"){
        return true;
    }
    if(event.action === "OUTCOME_ADDED"){
        return true;
    }

    return false;
}

function getSecondaryItem(event){
    if(event.action === "COMMENTED" || event.action === "OUTCOME_ADDED"){
        return (
            <div>
                <FroalaEditorView
                    model={event.data.comment.body}
                />
            </div>
        )
    }

    return (<></>);
}

function getDateDiff(event){
    const hours = moment(new Date().getTime()).diff(event.createdDate, "hours");

    if(hours < 24){
        if(hours === 0){
            return "a moment ago";
        }
        return `${hours} hours ago`;
    }else if(hours < 720){
        const days = moment(new Date().getTime()).diff(event.createdDate, "days");
        return `${days} days ago`;
    }else if(hours < 8640){
        const months = moment(new Date().getTime()).diff(event.createdDate, "months");
        return `${months} months ago`; 
    }else{
        const years = moment(new Date().getTime()).diff(event.createdDate, "years")
        return `${years} years ago`;
    }
}

const EventItemView = ({ event, eventAction, classes }) => (
    <li className={classes.eventItem}>
        <div className={classes.eventItemDetails}>
            <div className={classes.eventItemAvatar}>
                <Avatar user={event.author} />
            </div>
            <div className={classes.eventItemUserDetails}>
                <div className={classes.truncate}>
                    <strong>
                        {event.initiator ? event.initiator.displayname : 'Anonymous'}
                    </strong>{' '}
                     {getActionText(event)}
                    <span> ({getDateDiff(event)})</span>
                </div>
                {event.action=== "ATTRIBUTE_CHANGE_REQUESTED" &&
                    !event.isResolved && 
                 (
                    <div className={classes.eventItemActions}>
                        <Button 
                            color="primary" 
                            className={classes.button} 
                            onClick={() => eventAction(event.id, "APPROVE")}
                        >
                            Approve
                        </Button>
                        <Button 
                            color="secondary" 
                            className={classes.button} 
                            onClick={() => eventAction(event.id, "REJECT")}
                        >
                            Reject
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
);

const EventItem = withStyles(styles)(EventItemView);

export default EventItem;