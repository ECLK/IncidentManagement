import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Assignees from '../Assignees';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { getDateDiff, calculateDeadline } from './utils';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

//hooks
import { useDispatch, useSelector } from 'react-redux'

//icons
import RestoreIcon from '@material-ui/icons/Restore';
import TimerIcon from '@material-ui/icons/Timer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HelpIcon from '@material-ui/icons/Help';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';
import SpeackerNotesIcon from '@material-ui/icons/SpeakerNotes';

import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

//actions
import { showModal } from '../../../modals/state/modal.actions'

//utils
import { userCan, USER_ACTIONS } from '../../../utils/userUtils';

const styles = (theme) => ({
    card: {
        minWidth: 275,
        boxShadow: "none",
        padding: 20
    },
    button: {
        marginTop: theme.spacing.unit,
    },
    divider: {
        marginTop: theme.spacing.unit * 4
    },
    topDivider: {
        marginTop: theme.spacing.unit
    },
    actionButtonIcon: {
        marginRight: theme.spacing.unit * 2
    },
    timeLimitOverDue: {
        color:'red'
    },
    button: {
        textAlign: "left"
    }
});

const getLastActionTime = (events) => {

    if (events.length === 0) {
        return "No action taken yet";
    }

    return getDateDiff(events[0].createdDate);
}


const EventActions = (props) => {

    const { classes, getUsers,
        setIncidentAssignee, users } = props;

    var hourlyResponseTimes = []
    for (var i = 1; i < 24; i++) {
        hourlyResponseTimes.push(i);
    }

    const dispatch = useDispatch()
    const activeIncident = useSelector(state => state.sharedReducer.activeIncident.data);
    const currentUser = useSelector(state => state.sharedReducer.signedInUser.data);
    const timeLimitInfo = calculateDeadline(activeIncident);
    const timeLimitText = timeLimitInfo.text;
    const timeLimitStatus = timeLimitInfo.status;

    if (!activeIncident) {
        return null
    }

    return (
        <div className={classes.card}>

            <Divider variant="middle" className={classes.topDivider} />

            <List className={classes.root}>
                <ListItem>
                    <Avatar>
                        <PermIdentityIcon />
                    </Avatar>
                    <ListItemText primary="Assigned to" secondary={activeIncident.assignees ? activeIncident.assignees[0].displayname : ""} />
                    
                    {activeIncident.currentStatus !== 'CLOSED' &&
                        activeIncident.currentStatus !== 'INVALIDATED' && 
                        userCan(currentUser, activeIncident, USER_ACTIONS.CHANGE_ASSIGNEE) &&
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" onClick={() => { dispatch(showModal('CHANGE_ASSIGNEE_MODAL', { activeIncident, users })) }}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>

                <ListItem>
                    <Avatar>
                        <RestoreIcon />
                    </Avatar>
                    <ListItemText primary="Last actioned at" secondary={getLastActionTime(props.events)} />
                </ListItem>

                <ListItem>
                    <Avatar>
                        <AccessTimeIcon />
                    </Avatar>
                    <ListItemText primary="Close within" secondary={activeIncident.response_time + " hours."} />
                    {activeIncident.currentStatus !== 'CLOSED'  && 
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" onClick={() => { dispatch(showModal('RESPOSE_TIME_EDIT', { activeIncident })) }}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    }
                </ListItem>

                <ListItem>
                    <Avatar>
                        <HourglassEmptyIcon />
                    </Avatar>
                    <ListItemText 
                        primary="Close this before" 
                        secondary={timeLimitText}
                        classes = {{
                            inset:true,
                            secondary: calculateDeadline(activeIncident).status === 'OVERDUE' && classes.timeLimitOverDue
                        }}
                    />
                </ListItem>

                <ListItem>
                    <Avatar>
                        <ShowChartIcon />
                    </Avatar>
                    <ListItemText primary="Status" secondary={activeIncident.currentStatus} />
                </ListItem>

            </List>


            <Divider variant="middle" className={classes.divider} />

            {activeIncident.currentStatus !== 'CLOSED'  && 
            activeIncident.currentStatus !== 'INVALIDATED'  && 
              userCan(currentUser, activeIncident, USER_ACTIONS.RUN_WORKFLOW) && 
                <>
                {userCan(currentUser, activeIncident, USER_ACTIONS.ESCALATE_INCIDENT) && 
                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={props.escallateIncident}>
                        <ArrowUpwardIcon className={classes.actionButtonIcon} />
                        Escalate
                    </Button>
                }
                
                <Button color="primary" size="large" variant='text' className={classes.button} onClick={()=>{dispatch(showModal('ESCALLATE_OUTSIDE', { incidentId: activeIncident.id }))}}>
                    <SubdirectoryArrowLeftIcon className={classes.actionButtonIcon} />
                    Refer to organization 
                </Button>
                <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('REQUEST_ADVICE_MODAL', { activeIncident, users })) }}>
                    <HelpIcon className={classes.actionButtonIcon} />
                    Request for advice
                </Button>
                {/* <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('PROVIDE_ADVICE_MODAL', { activeIncident })) }}>
                    <SpeackerNotesIcon className={classes.actionButtonIcon} />
                    Provide advice
                </Button> */}

                {userCan(currentUser, activeIncident, USER_ACTIONS.CLOSE_INCIDENT) &&
                    <>
                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('CLOSE_MODAL', { activeIncident })) }}>
                        <WhereToVoteIcon className={classes.actionButtonIcon} />
                        Close Incident
                    </Button>

                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('INVALIDATE_MODAL', { activeIncident })) }}>
                        <WhereToVoteIcon className={classes.actionButtonIcon} />
                        Invalidate Incident
                    </Button>
                    </>
                } 
                </>
            }
        </div>
    );
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
