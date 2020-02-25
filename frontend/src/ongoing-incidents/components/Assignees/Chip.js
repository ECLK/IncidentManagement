import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

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

    getAvatarLetters(name) {
        let splitWord = name.split(' ');
        if (splitWord.length == 1) {
            return splitWord[0].charAt(0) + splitWord[0].charAt(1).toUpperCase();
        } else {
            return splitWord[0].charAt(0) + splitWord[1].charAt(0);
        }
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
                {users && users.map(user => {
                    if(user){
                    return (
                    <Grid key={user.key}>
                        <Chip
                            label={user.userName}
                            avatar={<Avatar>{this.getAvatarLetters(user.userName)}</Avatar>}
                            key={user.uid}
                            onClick={this.handleClick}
                            // onDelete={() => this.handleDelete(user.uid)}
                            className={classes.chip}
                        />
                    </Grid>
                    )}
                    
                })}
            </div>
        );
    }
}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chips);