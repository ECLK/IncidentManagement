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
        const { classes, activeIncident, onStatusChange } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6">
                        Status
                    </Typography>
                    <Typography variant="body1  ">
                        <StatusChange 
                            activeIncident={activeIncident} 
                            onStatusChange={onStatusChange}
                        />
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

EventActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventActions);
