import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
});

function DatePickers(props) {

    const { classes, dateTime, setDateTime, formErrors } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                autoFocus
                id="date"
                label="Date"
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
                label="Time"
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
        </form>
    );
}

DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
