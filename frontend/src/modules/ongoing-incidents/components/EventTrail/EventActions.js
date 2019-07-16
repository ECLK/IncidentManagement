import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StatusChange from './StatusChange';
import Assignees from '../Assignees';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Moment from 'react-moment';
import { getDateDiff } from './utils';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

//hooks
import { useDispatch } from 'react-redux'

//icons
import RestoreIcon from '@material-ui/icons/Restore';
import TimerIcon from '@material-ui/icons/Timer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import HelpIcon from '@material-ui/icons/Help';
import EditIcon from '@material-ui/icons/Edit';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

//actions
import {showModal} from '../../../modals/state/modal.actions'

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
    actionButtonIcon:{
        marginRight: theme.spacing.unit * 2
    }
});

const getLastActionTime = (events) => {

    if (events.length === 0) {
        return "No action taken yet";
    }

    return getDateDiff(events[0].createdDate);
}


const EventActions = (props) => {

        const { classes, activeIncident, onStatusChange,
            onSeverityChange, activeUser, getUsers,
            setIncidentAssignee, users } = props;

        var hourlyResponseTimes = []
        for (var i = 1; i < 24; i++) {
            hourlyResponseTimes.push(i);
        }

        const dispatch = useDispatch()

        return (
            <div className={classes.card}>

                <Divider variant="middle" className={classes.topDivider} />


                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Assignee
                </Typography>
                <Assignees
                    // activeIncident={activeIncident}
                    assignees={activeIncident.assignees}
                    id={activeIncident.id}
                    getUsers={getUsers}
                    setIncidentAssignee={setIncidentAssignee}
                    users={users}
                />

                {/* <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Time from last action
                    </Typography>
                <Typography variant="h7">
                    {this.getLastActionTime()}
                </Typography>

                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Required response time
                </Typography>
                <FormControl className={classes.formControl}>
                    <Select
                        value={activeIncident.responseTimeInHours}
                        onChange={this.handleChange}
                        name="age"
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="" disabled>
                            N/A
                        </MenuItem>
                        {hourlyResponseTimes.map((value, index)=>{
                            return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                        })}
                    </Select>
                </FormControl>

                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Status:
                </Typography>
                <Typography variant="h7">
                    {activeIncident.status}
                </Typography>

                <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Severity
                </Typography>
                <StatusChange
                    activeIncident={activeIncident}
                    currentValue={activeIncident.severity}
                    onValueChange={onSeverityChange}
                    selectType="severity"
                    activeUser={activeUser}
                /> */}


                <List className={classes.root}>
                    <ListItem>
                        <Avatar>
                            <RestoreIcon />
                        </Avatar>
                        <ListItemText primary="Time Since last action" secondary={getLastActionTime(props.events)} />
                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <TimerIcon />
                        </Avatar>
                        <ListItemText primary="Required response time" secondary={activeIncident.responseTimeInHours+" hours.1 hour(s) remaining.\n Ends at 5.30 p.m."} />

                        <ListItemSecondaryAction>
                            {/* <Select
                            value={activeIncident.responseTimeInHours}
                            onChange={this.handleChange}
                            name="age"
                            displayEmpty
                            className={classes.selectEmpty}
                            >
                                <MenuItem value="" disabled>
                                    N/A
                                </MenuItem>
                                {hourlyResponseTimes.map((value, index)=>{
                                    return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                                })}
                            </Select> */}
                            <IconButton aria-label="Edit">
                                <EditIcon onClick={()=>{dispatch(showModal('RESPOSE_TIME_EDIT',{activeIncident}))}}/>
                            </IconButton>
                        </ListItemSecondaryAction>

                    </ListItem>
                    <ListItem>
                        <Avatar>
                            <ShowChartIcon />
                        </Avatar>
                        <ListItemText primary="Status" secondary={activeIncident.status} />
                    </ListItem>
                </List>


                <Divider variant="middle" className={classes.divider} />

                {/* <Typography variant="h6" style={{ marginTop: "20px" }}>
                    Actions
                </Typography> */}

                <Button color="primary" size="large" variant='text' className={classes.button} onClick={props.escallateIncident}>
                    <ArrowUpwardIcon className={classes.actionButtonIcon}/>
                    Escalate
                </Button>
                <Button color="primary" size="large" variant='text' className={classes.button}>
                    <SubdirectoryArrowLeftIcon className={classes.actionButtonIcon}/>
                    Escalate to outside 
                </Button>
                <Button color="primary" size="large" variant='text' className={classes.button}>
                    <HelpIcon className={classes.actionButtonIcon}/>
                    Request for advice
                </Button>


            </div>
        );
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
