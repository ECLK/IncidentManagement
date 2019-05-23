import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';
import SettingIcon from '@material-ui/icons/Settings';
import Select from '@material-ui/core/Select';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import * as auth from '../../utils/authorization';

const styles = {
    statusChip: {
        minWidth: "270px",
        flexGrow:1
    },
    chipIcon: {
        marginLeft: "auto"
    }
};

const statusMap = {
    "NEW": "New",
    "VERIFIED": "Verified",
    "ACTION_TAKEN": "Action Taken",
    "ACTION_PENDING": "Action Pending",
    "ADVICE_REQESTED": "Advice Requested",
    "ADVICE_PROVIDED": "Advice Provided",
    "CLOSED": "Closed"
}

const severityMap = {
    "CRITICAL": "Critical",
    "MAJOR": "Major",
    "MODERATE": "Moderate",
    "MINOR": "Minor",
    "INSIGNIFICANT": "Insignificant",
    "DEFAULT": "Default"
}

class StatusChange extends React.Component{
    state = {
        anchorEl: null
    }

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

    handleItemChange = (value) => {
        const { activeIncident, onValueChange} = this.props;

        onValueChange(activeIncident.id, value);

        this.setState({
            anchorEl: null,
        });
    }

    render(){
        const { classes, currentValue, selectType, activeUser, activeIncident } = this.props;
        const open = Boolean(this.state.anchorEl);

        const valueMap = selectType === "status" ? statusMap : severityMap;
        const popoverId = selectType === "status" ? 'status-popover' : 'severity-popover';
        
        const settingIcon = <SettingIcon
                                aria-owns={open ? popoverId : undefined}
                                aria-haspopup="true"
                                variant="contained"
                                className={classes.chipIcon}
                            />
        
        var actionChip = <Chip 
                            label={valueMap[currentValue]}
                            color="primary"
                            onDelete={this.handleSettingClick}
                            className={classes.statusChip}
                            deleteIcon={settingIcon}
                        />;
        if(selectType === "status"){
            if(auth.canChangeStatus(activeUser) === "CANT"){
                actionChip = <Chip 
                                label={valueMap[currentValue]}
                                color="primary"
                                onClick={this.props.onClick}
                                className={classes.statusChip}
                            />;
            }else if(activeIncident.hasPendingStatusChange){
                actionChip = <Chip 
                                label={valueMap[currentValue]}
                                color="primary"
                                onClick={this.props.onClick}
                                className={classes.statusChip}
                                variant="outlined"
                            />;
            }
        }


        return (
            <div>

                {actionChip}

                <Menu
                    id={popoverId}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handlePopOverClose}
                    onChange={this.handleItemChange}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    getContentAnchorEl={null}
                >   
                    {Object.keys(valueMap).map((val, ind) => (
                        <MenuItem 
                            value={val} 
                            key={ind}
                            onClick={() => this.handleItemChange(val)}
                        >{valueMap[val]}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

StatusChange.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatusChange);
