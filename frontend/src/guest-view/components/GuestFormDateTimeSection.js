import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit*2,
        width: 200,
    },
    errorMessage: {
        marginLeft: theme.spacing.unit,
        marginTop: -8,
        marginBottom: theme.spacing.unit,
    }
});

function DatePickers(props) {

    const {formatMessage: f} = useIntl();
    const { classes, dateTime, setDateTime, formErrors } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                autoFocus
                id="date"
                label={f({ id: "eclk.incident.management.report.incidents.date", defaultMessage:"Date" })+"*"}
                type="date"
                value={dateTime.date}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e)=>{
                    setDateTime({...dateTime, date:e.target.value});
                    formErrors.incidentDatetimeErrorMsg = null;
                }}
                helperText="mm/dd/yyyy"
                error={formErrors.incidentDatetimeErrorMsg?true:false}
            />

            <TextField
                id="date"
                label={f({ id: "eclk.incident.management.report.incidents.time", defaultMessage:"Time" })+"*"}
                type="time"
                value={dateTime.time}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e)=>{
                    setDateTime({ ...dateTime, time:e.target.value});
                    formErrors.incidentDatetimeErrorMsg = null;
                }}
                helperText="hh:mm aa"
                error={formErrors.incidentDatetimeErrorMsg?true:false}
            />
            <Grid container>
            <Typography 
                align="left"
                variant="caption"
                color="error"
                className={classes.errorMessage}

            >
                { (formErrors.incidentDatetimeErrorMsg)?f({id:"eclk.incident.management.report.incidents.datetime.error.message", defaultMessage:"Date and time are required"}):'' }
            </Typography>
            </Grid>
        </form>
    );
}

DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
