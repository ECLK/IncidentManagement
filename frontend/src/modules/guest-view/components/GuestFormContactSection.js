import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
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


const IncidentContact = (props) => {

    const {
        classes,
        handleContactDetailsChange,
        contactDetials,
    } = props;

    return (
        <form className={classes.container} noValidate autoComplete="off">

            <Grid container>

                <Grid item xs={8}>
                    <TextField
                        id="incidentDescription"
                        label="Name"
                        autoFocus
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.name}
                        onChange={(e) => { handleContactDetailsChange({...contactDetials, name:e.target.value}) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={8}>
                    <TextField
                        id="incidentDescription"
                        label="Phone number"
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.phone}
                        onChange={(e) => { handleContactDetailsChange({ ...contactDetials, phone:e.target.value}) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={8}>
                    <TextField
                        id="incidentDescription"
                        label="Email"
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.email}
                        onChange={(e) => { handleContactDetailsChange({...contactDetials, email:e.target.value}) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                

            </Grid>

        </form>
    );
}

IncidentContact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentContact);
