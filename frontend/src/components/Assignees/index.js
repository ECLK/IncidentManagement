import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomAutocomplete from './Autocomplete';
import CustomChip from './Chip';
import Avatar from '@material-ui/core/Avatar';

const suggestions = [
    { label: 'Clement', value: 1001, },
    { label: 'Elon Musk', value: 1002, },
    { label: 'Richard Branson', value: 1003, },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

function getAvatarLetters(name) {
    let splitWord = name.split(' ');
    if (splitWord.length == 1){
        return splitWord[0].charAt(0)+splitWord[0].charAt(1).toUpperCase();
    } else {
        return splitWord[0].charAt(0)+splitWord[1].charAt(0);
    }
}

class Assginee extends React.Component {

    constructor(props){
        super(props);
        this.state = ({
            users: []
        });
    }

    handleChange = (value, key) => {
        let user = {
            name: value,
            avatar: <Avatar>{getAvatarLetters(value)}</Avatar>,
            key: key,
        };
        this.setState({
            users: this.state.users.concat(user),
        });
    };


    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6} sm={3}>
                        <CustomChip users={this.state.users}/>
                        <CustomAutocomplete suggestions={suggestions} handleChange={this.handleChange}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Assginee.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Assginee);