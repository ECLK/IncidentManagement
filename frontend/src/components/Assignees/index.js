import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomAutocomplete from './Autocomplete';
import CustomChip from './Chip';
import Avatar from '@material-ui/core/Avatar';

import AlertSnackbar from './AlertSnackbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const suggestions = [
    { label: 'Clement', value: 1001, },
    { label: 'Elon Musk', value: 1002, },
    { label: 'Richard Branson', value: 1003, },
]

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    errorSnackbar: {
        backgroundColor: theme.palette.error.dark,
    }
});

function getAvatarLetters(name) {
    let splitWord = name.split(' ');
    if (splitWord.length == 1) {
        return splitWord[0].charAt(0) + splitWord[0].charAt(1).toUpperCase();
    } else {
        return splitWord[0].charAt(0) + splitWord[1].charAt(0);
    }
}

class Assginee extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            users: [],
            // open: false,
            alert: {
                variant: "error",
                message: "This user assigned already!",
                open: false,    
            },
        });
    }

    handleChange = (value, key) => {
        const similar = this.state.users.filter(user => user.key == key);
        if (similar == "") {
            let user = {
                name: value,
                avatar: <Avatar>{getAvatarLetters(value)}</Avatar>,
                key: key,
            };
            this.setState({
                users: this.state.users.concat(user),
            });
        } else {
            this.setState({
                alert: {
                    variant: "error",
                    message: "This user assigned already!",
                    open: true,
                }
                // open: true,
            });
        }
    };

    handleClose = () => {
        this.setState({
            alert: {
                variant: "error",
                message: "This user assigned already!",
                open: false,
            }
        });
    };


    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6} sm={3}>
                        <CustomChip users={this.state.users} />
                        <CustomAutocomplete suggestions={suggestions} handleChange={this.handleChange} />
                    </Grid>
                </Grid>

                <AlertSnackbar alert={this.state.alert} handleClose={this.handleClose}/>

                {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Selected user assigned already!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                /> */}

            </div>
        );
    }
}

Assginee.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Assginee);