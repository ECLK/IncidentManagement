import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

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
    const { formatMessage: f } = useIntl();

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
                        label={f({id:"eclk.incident.management.report.incidents.contact.name", defaultMessage:"Name" })}
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
                        label={f({id:"eclk.incident.management.report.incidents.contact.mobile", defaultMessage:"Mobile"})}
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={contactDetials.mobile}
                        onChange={(e) => { handleContactDetailsChange({ ...contactDetials, mobile:e.target.value}) }}
                        className={classes.textField}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={8}>
                    <TextField
                        id="incidentDescription"
                        label={f({id:"eclk.incident.management.report.incidents.contact.landline", defaultMessage:"Landline"})}
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
                        label={f({id:"eclk.incident.management.report.incidents.contact.email", defaultMessage:"Email"})}
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
