import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';

import Assignees from '../Assignees';
import { fetchAllUsers, setIncidentAssignee } from '../../state/OngoingIncidents.actions'

const styles =(theme) =>  ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
      }
});


  
  function getModalStyle() {
    const top = 40 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class VerifyIncidentConfirm extends Component {


    render(){
        
        const {
        classes,
        open,
        handleClose,
        users,
        getUsers,
        activeIncident,
        setIncidentAssignee } = this.props;

    return (

        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    Verify Incident
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    Assign a user and a status to the incident
                </Typography>

                {/* <Assignees 
                    assignees = {activeIncident.assignees}
                    id = {activeIncident.id}
                    getUsers={getUsers}
                    setIncidentAssignee={setIncidentAssignee}
                    users={users}
                /> */}

                <Button >Cancel</Button>
                <Button >Confirm</Button>
            </div>

            
        </Modal>

    );
}

}

VerifyIncidentConfirm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.ongoingIncidentReducer.users,
        activeIncident: state.sharedReducer.activeIncident.data,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            dispatch(fetchAllUsers());
        },
        setIncidentAssignee: (incidentId, uid, actionType) => {
            dispatch(setIncidentAssignee(incidentId, uid, actionType));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VerifyIncidentConfirm));
