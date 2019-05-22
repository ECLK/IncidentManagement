import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    chip: {
        maxWidth: 400,
        margin: theme.spacing.unit,
    },
});

function handleDelete() {
    console.log('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    console.log('You clicked the Chip.'); // eslint-disable-line no-alert
}

function Chips(props) {
    const { classes, users } = props;
    return (
        <div className={classes.root}>
            {users.map(user => (
                <Grid>
                    <Chip
                        label={user.name}
                        avatar={user.avatar}
                        key={user.value}
                        onClick={handleClick}
                        onDelete={handleDelete}
                        className={classes.chip}
                    />
                </Grid>
            ))}
        </div>
    );
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);