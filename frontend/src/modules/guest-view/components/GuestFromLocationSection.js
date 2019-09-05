import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


const  IncidentLocation = (props) =>  {

        const { 
            classes,
            handledLocationChange,
            location,
         } = props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                
                <TextField
                    autoFocus
                    id="incidentLocation"
                    label="Describe location"
                    multiline
                    fullWidth
                    rowsMax="4"
                    value={location}
                    onChange={(e)=>{handledLocationChange(e.target.value)}}
                    className={classes.textField}
                    margin="normal"
                />


            </form>
        );
}

IncidentLocation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentLocation);
