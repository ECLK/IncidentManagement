import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StatusChange from './StatusChange';
import Assignees from '../Assignees';

import Moment from 'react-moment';
import { getDateDiff } from './utils';

const styles = {
    card: {
        minWidth: 275,
        boxShadow: "none",
        border: "1px solid #ccc"
    }
};

class EventActions extends React.Component{

    handleSettingClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
    };

    handlePopOverClose = () => {
        this.setState({
          anchorEl: null,
        });
    };

    getLastActionTime = () => {
        const  { events } = this.props;
        
        if(events.length === 0){
            return "No action taken yet";
        }

        return getDateDiff(events[0].createdDate);
    }

    render(){
        const { classes, activeIncident, onStatusChange, 
                onSeverityChange, activeUser, getUsers, 
                setIncidentAssignee,users } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">
                        RefId
                    </Typography>
                    <Typography variant="h7">
                        {activeIncident.refId}
                    </Typography>

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Logged Date and Time
                    </Typography>
                    <Typography variant="h7">
                        <Moment>{activeIncident.createdDate}</Moment>
                    </Typography>

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Time from last action
                    </Typography>
                    <Typography variant="h7">
                        {this.getLastActionTime()}
                    </Typography>

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Required response time
                    </Typography>
                    <Typography variant="h7">
                        6 hours
                    </Typography>

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Status
                    </Typography>
                    <StatusChange 
                        activeIncident={activeIncident}
                        currentValue={activeIncident.status} 
                        onValueChange={onStatusChange}
                        selectType="status"
                        activeUser={activeUser}
                    />

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Severity
                    </Typography>
                    <StatusChange 
                        activeIncident={activeIncident}
                        currentValue={activeIncident.severity} 
                        onValueChange={onSeverityChange}
                        selectType="severity"
                        activeUser={activeUser}
                    />

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Assignees
                    </Typography>
                    <Assignees 
                        activeIncident={activeIncident}
                        getUsers={getUsers}
                        setIncidentAssignee={setIncidentAssignee}
                        users={users}
                    />
                </CardContent>
            </Card>
        );
    }
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
