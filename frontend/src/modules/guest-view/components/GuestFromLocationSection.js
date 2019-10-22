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


const IncidentLocation = (props) => {

    const {
        classes,
        location,
        handledLocationChange,
        address,
        handleAddressChange,
        city,
        handleCityChange
    } = props;

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        id="incidentLocation"
                        label="Location name or description"
                        multiline
                        fullWidth
                        rowsMax="5"
                        value={location}
                        onChange={(e) => { handledLocationChange(e.target.value) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="incidentAddress"
                        label="Address"
                        multiline
                        fullWidth
                        rowsMax="5"
                        value={address}
                        onChange={(e) => { handleAddressChange(e.target.value) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="incidentCity"
                        label="City"
                        fullWidth
                        value={city}
                        onChange={(e) => { handleCityChange(e.target.value) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
            </Grid>
        </form>
    );
}

IncidentLocation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentLocation);
