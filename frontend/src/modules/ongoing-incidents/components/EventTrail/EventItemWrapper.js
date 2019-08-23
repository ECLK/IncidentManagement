
//TODO: this was a quick fix to make the comment trail look bit nicer. Properly implement this later. 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import CommentEvent from './EventItem';
import Avatar from './Avatar'



import { useDispatch } from 'react-redux';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import * as moment from 'moment';
import Button from '@material-ui/core/Button';

import { showModal } from '../../../modals/state/modal.actions'


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


function getStatusChangeText(event) {
    const toStatus = event.data.status.to_status_type
    switch (toStatus) {
        case 'VERIFIED':
            return 'verified the incident'
        case 'ADVICE_REQESTED':
            return `requested advice from: `
        case 'ADVICE_PROVIDED':
            return `provided action`
        case 'ACTION_PENDING':
            return `escallated the incident to outside entity`
        case 'ACTION_TAKEN':
            return 'action taken'
        case 'Close':
            return 'closed the incident'
        default:
            return 'performed an unknown status change'
    }
}


function getActionText(event) {
    switch (event.action) {
        case "GENERIC_UPDATE":
            return "edited incident information";
        case "ATTRIBUTE_CHANGED":
            switch (event.affectedAttribute) {
                case "STATUS":
                    return getStatusChangeText(event)
                case "SEVERITY":
                    return `changed the severity from ${event.data.severity.from_severity_type} 
                                to ${event.data.severity.to_severity_type}`;
                default:
                    return 'unknown attribute change'
            }
        case "ATTRIBUTE_CHANGE_REQUESTED":
            switch (event.affectedAttribute) {
                case "STATUS":
                    return `requested to change the status from ${event.data.status.from_status_type} 
                                to ${event.data.status.to_status_type}`;
                default:
                    return 'unknown attribute change request'
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
        case "ENTITY_ASSIGNED":
            return `assigned ${event.data.user.displayname} to the incident`;
        case "ENTITY_REMOVED":
            return `removed ${event.data.user.displayname} from the incident`
        case "CREATED":
            return ` created the incident`
        case "ACTION_STARTED":
            return ` escallated to ${event.description}`
        case "ACTION_COMPLETED":
            return ` marked as action completed`
        default:
            return "unknown action"
    }
}


function hasEventBody(event) {
    if (event.action === "COMMENTED") {
        return true;
    }
    if (event.action === "OUTCOME_ADDED") {
        return true;
    }
    return false;
}


function getSecondaryItem(event) {
    if (event.action === "COMMENTED" || event.action === "OUTCOME_ADDED") {
        return (
            <div>
                {ReactHtmlParser(event.data.comment.body)}
            </div>
        )
    }
    return (<></>);
}


function getDateDiff(event) {
    const hours = moment(new Date().getTime()).diff(event.createdDate, "hours");

    if (hours < 24) {
        if (hours === 0) {
            return "a moment ago";
        }
        return `${hours} hours ago`;
    } else if (hours < 720) {
        const days = moment(new Date().getTime()).diff(event.createdDate, "days");
        return `${days} days ago`;
    } else if (hours < 8640) {
        const months = moment(new Date().getTime()).diff(event.createdDate, "months");
        return `${months} months ago`;
    } else {
        const years = moment(new Date().getTime()).diff(event.createdDate, "years")
        return `${years} years ago`;
    }
}





const styles = theme => ({
  root: {
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
});

function EventItemView(props) {
  const { classes, event, eventAction, eventLinks } = props;

 
      return (
        <ListItem alignItems="flex-start" className={classes.root}>
        <ListItemAvatar>
            <Avatar user={event.author} />
        </ListItemAvatar>
        <ListItemText
          primary={
              <>
                <CommentEvent event={event} eventLinks={eventLinks} eventAction={eventAction}/>
              </>
          }
        />
        </ListItem>
      )

//   return (
//       <ListItem alignItems="flex-start" className={classes.root}>
//         <ListItemAvatar>
//             <Avatar user={event.author} />
//         </ListItemAvatar>
//         <ListItemText
//           primary={event.initiator ? event.initiator.displayname : 'Anonymous'} 
//           secondary={
//             <React.Fragment>
//               <Typography variant="subheading"  color="textPrimary">
//                 {`${getActionText(event)} (${getDateDiff(event)})`}
//               </Typography>
//               {getSecondaryItem(event)}
//             </React.Fragment>
//           }
//         />
//       </ListItem>

//   );
}

EventItemView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventItemView);


