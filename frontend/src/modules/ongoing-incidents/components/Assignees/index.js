import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomAutocomplete from './Autocomplete';
import CustomChip from './Chip';
import Avatar from '@material-ui/core/Avatar';

import AlertSnackbar from './AlertSnackbar';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    errorSnackbar: {
        backgroundColor: theme.palette.error.dark,
    }
});

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

    componentDidMount(){
        this.props.getUsers();
    }

    handleChange = (value, key) => {
        const { id, assignees } = this.props.activeIncident;
        const { setIncidentAssignee } = this.props;

        const similar = assignees.filter(user => user.uid == key);
        if (similar == "") {
            setIncidentAssignee(id, key, "ADD");
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
    }

    handleClose = () => {
        this.setState({
            alert: {
                variant: "error",
                message: "This user assigned already!",
                open: false,
            }
        });
    }

    handleDelete = (value) => {
        const { id, assignees } = this.props.activeIncident;
        const { setIncidentAssignee } = this.props;

        setIncidentAssignee(id, value, "REMOVE");
    }


    render() {
        const { classes, theme, activeIncident, users } = this.props;
        const suggestions = users.map((o) => ( {label: o.displayName, value: o.uid }) ); 
        
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        { activeIncident && activeIncident.assignees && (
                            <>
                                <CustomChip users={activeIncident.assignees} handleDelete={this.handleDelete}/>
                                <CustomAutocomplete suggestions={suggestions} handleChange={this.handleChange} />
                            </>
                        )}
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