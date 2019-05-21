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

const styles = {
    statusChip: {
        minWidth: "300px"
    },
    chipIcon: {
        marginLeft: "auto"
    }
};

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

    handleItemChange = (statusValue) => {
        const { activeIncident, onStatusChange} = this.props;

        onStatusChange(activeIncident.id, statusValue);
        this.setState({
            anchorEl: null,
        });
    }

    render(){
        const { classes, activeIncident } = this.props;
        const open = Boolean(this.state.anchorEl);
        
        const settingIcon = <SettingIcon
                                aria-owns={open ? 'setting-popover' : undefined}
                                aria-haspopup="true"
                                variant="contained"
                                className={classes.chipIcon}
                            />
        
        const statusMap = {
            "NEW": "New",
            "VERIFIED": "Verified",
            "ACTION_TAKEN": "Action Taken",
            "ACTION_PENDING": "Action Pending",
            "ADVICE_REQESTED": "Advice Requested",
            "ADVICE_PROVIDED": "Advice Provided",
            "CLOSED": "Closed"
        }

        return (
            <div>
                <Chip 
                    label={statusMap[activeIncident.status]}
                    color="primary"
                    onClick={this.props.onClick}
                    onDelete={this.handleSettingClick}
                    className={classes.statusChip}
                    deleteIcon={settingIcon}
                /> 

                <Menu
                    id="setting-popover"
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
                    {Object.keys(statusMap).map((val, ind) => (
                        <MenuItem 
                            value={val} 
                            key={ind}
                            onClick={() => this.handleItemChange(val)}
                        >{statusMap[val]}
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
