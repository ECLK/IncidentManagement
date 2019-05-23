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

class Chips extends React.Component {

    constructor(props){
        super(props);
        // this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = value => {
        this.props.handleDelete(value);
    }
    
    handleClick = () => {
        console.log('You clicked the Chip.'); // eslint-disable-line no-alert
    }

    render() {
        const { classes, users } = this.props;
        return (
            <div className={classes.root}>
                {users.map(user => (
                    <Grid>
                        <Chip
                            label={user.name}
                            avatar={user.avatar}
                            key={user.key}
                            onClick={this.handleClick}
                            onDelete={() => this.handleDelete(user.key)}
                            className={classes.chip}
                        />
                    </Grid>
                ))}
            </div>
        );
    }
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);