import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { withStyles } from '@material-ui/core/styles';
import Avatar from './Avatar';

const styles = {
    truncate: {
        width: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

function getActionText(event){
    switch(event.action){
        case "GENERIC_UPDATE":
            return "edited incident information";
        case "ATTRIBUTE_CHANGED":
            switch(event.affected_attribute){
                case "STATUS":
                    return `changed the status to ${event.data.status.status_type}`;
                case "SEVERITY":
                    return `changed the status to ${event.data.severity.severity_type}`;
            }
        case "COMMENTED":
            return "commented on the incident";
        case "MEDIA_ATTACHED":
            return "attached media";
    }
}

function getSecondaryItem(event){
    if(event.action === "COMMENTED"){
        return (
            <div>
                {event.data.comment.body}
            </div>
        )
    }

    return (<></>);
}

function getDateDiff(event){
    
}

const EventItemView = ({ event, classes }) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar user={event.author} />
        </ListItemAvatar>
        <ListItemText
            primary={
                <div className={classes.truncate}>
                    <strong>
                        {event.initiator ? event.initiator.displayname : 'Anonymous'}
                    </strong>{' '}
                    {getActionText(event)}
                </div>
            }
            secondary={getSecondaryItem(event)}
        />
    </ListItem>
);

const EventItem = withStyles(styles)(EventItemView);

export default EventItem;