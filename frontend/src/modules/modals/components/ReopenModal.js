import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react-redux hooks
import { useDispatch, useSelector } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'
import { TextField } from '@material-ui/core';


const onSubmitClick = (dispatch, incidentId, comment) => {
    dispatch(fetchUpdateWorkflow(incidentId, "reopen", { comment } ));
    dispatch(hideModal());
}

const ReopenModal = (props) => {

    const dispatch = useDispatch();

    //maintains selected value in local state until change is confirmed
    const [comment, setComment] = useState("");

    return (
        <div>
            <DialogTitle id="form-dialog-title">Reopen Incident</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Comment
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="assignee"
                    type="text"
                    value={comment}
                    onChange={(e)=>{ setComment(e.target.value) }}
                    fullWidth
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dispatch(hideModal()) }} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={() => onSubmitClick(dispatch, props.activeIncident.id, comment)} 
                    color="secondary">
                    Reopen
                </Button>
            </DialogActions>
        </div>
    );
}

export default ReopenModal;
