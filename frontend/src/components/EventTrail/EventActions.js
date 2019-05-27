import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Select from '@material-ui/core/Select';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import StatusChange from './StatusChange';
import Divider from '@material-ui/core/Divider';
import Assignees from '../Assignees';

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

    render(){
        const { classes, activeIncident, onStatusChange, 
                onSeverityChange, activeUser, getUsers, 
                setIncidentAssignee,users } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">
                        Status
                    </Typography>
                    <Typography variant="body1">
                        <StatusChange 
                            activeIncident={activeIncident}
                            currentValue={activeIncident.status} 
                            onValueChange={onStatusChange}
                            selectType="status"
                            activeUser={activeUser}
                            activeIncident={activeIncident}
                        />
                    </Typography>

                    <Typography variant="h6" style={{marginTop:"20px"}}>
                        Severity
                    </Typography>
                    <Typography variant="body1">
                        <StatusChange 
                            activeIncident={activeIncident}
                            currentValue={activeIncident.severity} 
                            onValueChange={onSeverityChange}
                            selectType="severity"
                            activeUser={activeUser}
                            activeIncident={activeIncident}
                        />
                    </Typography>

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
