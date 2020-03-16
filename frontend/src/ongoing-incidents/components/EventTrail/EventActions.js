import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
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
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HelpIcon from '@material-ui/icons/Help';
import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';
import PrintIcon from '@material-ui/icons/Print'
import CancelIcon from '@material-ui/icons/Cancel'
import ErrorIcon from '@material-ui/icons/Error'

import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

//actions
import { showModal } from '../../../modals/state/modal.actions'

//utils
import { userCan, USER_ACTIONS } from '../../../user/userUtils';

// pdf output
import axios from 'axios'
import handler from '../../../api/apiHandler'
import { API_BASE_URL } from '../../../config'

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
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '30%',
        marginTop: -12,
        marginLeft: -6,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
});

const getLastActionTime = (events) => {

    if (events.allIds.length === 0) {
        return "No action taken yet";
    }

    return getDateDiff(events.byIds[events.allIds[0]].createdDate);
}


const EventActions = (props) => {

    const {
        classes,
        users,
        divisions
    } = props;

    var hourlyResponseTimes = []
    for (var i = 1; i < 24; i++) {
        hourlyResponseTimes.push(i);
    }

    const [isSlipLoading, setIsSlipLoading] = useState(false);
    const dispatch = useDispatch()
    const activeIncident = props.activeIncident;
    const currentUser = useSelector(state => state.shared.signedInUser.data);
    const timeLimitInfo = calculateDeadline(activeIncident);
    const timeLimitText = timeLimitInfo.text;

    if (!activeIncident) {
        return null
    }

    async function printSlip(){
        setIsSlipLoading(true)
        await handler.get(`${API_BASE_URL}/pdfgen/?template_type=slip&id=`+activeIncident.id, {
            responseType: 'blob'
        })
        .then(response => {
            setIsSlipLoading(false)
            const file = new Blob( [response.data], {type: 'application/pdf'})
            const fileURL = URL.createObjectURL(file)
            window.open(fileURL)
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className={classes.card}>

            <Divider variant="middle" className={classes.topDivider} />

            <List className={classes.root}>
                <ListItem>
                    <Avatar>
                        <PermIdentityIcon />
                    </Avatar>
                    <ListItemText primary="Assigned to" secondary={activeIncident.assignee ? activeIncident.assignee.displayname : ""} />

                    {activeIncident.currentStatus !== 'CLOSED' &&
                        activeIncident.currentStatus !== 'INVALIDATED' &&
                        userCan(currentUser, activeIncident, USER_ACTIONS.CAN_CHANGE_ASSIGNEE) &&
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Edit" onClick={() => { props.modalAction('CHANGE_ASSIGNEE_MODAL') }}>
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
                            <IconButton aria-label="Edit" onClick={() => { props.modalAction('RESPONSE_TIME_EDIT') }}>
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
                            // inset:true,
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
              userCan(currentUser, activeIncident, USER_ACTIONS.CAN_RUN_WORKFLOW) &&
                <>
                {userCan(currentUser, activeIncident, USER_ACTIONS.CAN_ESCALATE_INCIDENT) &&
                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => props.modalAction('ESCALATE_MODAL')}>
                        <ArrowUpwardIcon className={classes.actionButtonIcon} />
                        Escalate
                    </Button>
                }


                {userCan(currentUser, activeIncident, USER_ACTIONS.CAN_ESCALATE_EXTERNAL) &&
                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => props.modalAction('ESCALLATE_OUTSIDE')}>
                        <SubdirectoryArrowLeftIcon className={classes.actionButtonIcon} />
                        Refer to organization
                    </Button>
                }

                {/* TODO: add User Action permissions here */}
                {/* <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('REQUEST_ADVICE_MODAL', { activeIncident, users, divisions })) }}>
                    <HelpIcon className={classes.actionButtonIcon} />
                    Request for advice
                </Button> */}

                {userCan(currentUser, activeIncident, USER_ACTIONS.CAN_CLOSE_INCIDENT) &&

                    <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => props.modalAction('CLOSE_MODAL')}>
                        <CancelIcon className={classes.actionButtonIcon} />
                        Close Incident
                    </Button>
                }

                { (activeIncident.currentStatus === "NEW" || activeIncident.currentStatus === "REOPENED") &&
                    userCan(currentUser, activeIncident, USER_ACTIONS.CAN_INVALIDATE_INCIDENT) &&
                (
                        <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('INVALIDATE_MODAL', { activeIncident })) }}>
                            <ErrorIcon className={classes.actionButtonIcon} />
                            Invalidate Incident
                        </Button>
                )}

                </>
            }

            {activeIncident.currentStatus === 'CLOSED'  &&
                userCan(currentUser, activeIncident, USER_ACTIONS.CAN_REOPEN_INCIDENT) &&
                (
                <Button color="primary" size="large" variant='text' className={classes.button} onClick={() => { dispatch(showModal('REOPEN_MODAL', { activeIncident })) }}>
                    <WhereToVoteIcon className={classes.actionButtonIcon} />
                    Reopen Incident
                </Button>
                )
            }

            {
                activeIncident.currentStatus != 'CLOSED' && activeIncident.incidentType === "INQUIRY" &&
                (
                    <div className={classes.wrapper}>
                        <Button disabled={isSlipLoading} color="primary" size="large" variant='text' className={classes.button} onClick={() => printSlip()}>
                            <PrintIcon className={classes.actionButtonIcon} />
                            Print Slip
                        </Button>
                        {isSlipLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                )
            }
        </div>
    );
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
