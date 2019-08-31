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
        width: 200,
    },
});

function DatePickers(props) {

    const { classes, dateTime, setDateTime  } = props;

    return (
        <form className={classes.container} noValidate>
            <TextField
                autoFocus
                id="date"
                label="Date"
                type="date"
                value={dateTime.date}
                // defaultValue="2017-05-24"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e)=>{setDateTime({date:e.target.value})}}
            />

            <TextField
                id="date"
                label="Time"
                type="time"
                value={dateTime.time}
                defaultValue="07:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e)=>{setDateTime({date:e.target.value})}}
            />
        </form>
    );
}

DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);
