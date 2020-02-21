import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'
import { TextField } from '@material-ui/core';


const onSubmitClick = (dispatch, incidentId, details) => {
    dispatch(fetchUpdateWorkflow(incidentId, "close", { details } ));
    dispatch(hideModal());
}

const handleValueChange = (oldValues, field, value, setValue) => {
    let update = {...oldValues}
    update[field] = value
    setValue(update)
}

const CloseModal = (props) => {

    const dispatch = useDispatch();

    //maintains selected value in local state until change is confirmed
    const [details, setDetails] = useState({
        assignee:"",
        entities:"",
        departments:"",
        individuals:"",
        remark:""
    });

    return (
        <div>
            <DialogTitle id="form-dialog-title">Close Incident</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Assignee(s)/ contact point(s)
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="assignee"
                    type="text"
                    value={details.assignee}
                    onChange={(e)=>{handleValueChange(details, 'assignee', e.target.value, setDetails)}}
                    fullWidth
                    multiline
                />

                <DialogContentText>
                    Name of external entities /internal entities
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="entities"
                    type="text"
                    value={details.entities}
                    onChange={(e)=>{handleValueChange(details, 'entities', e.target.value, setDetails)}}
                    fullWidth
                    multiline
                />

                <DialogContentText>
                    Department(s), if any
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="departments"
                    type="text"
                    value={details.departments}
                    onChange={(e)=>{handleValueChange(details, 'departments', e.target.value, setDetails)}}
                    fullWidth
                    multiline
                />

                <DialogContentText>
                    Name of individual(s), if any
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="individuals"
                    type="text"
                    value={details.individuals}
                    onChange={(e)=>{handleValueChange(details, 'individuals', e.target.value, setDetails)}}
                    fullWidth
                    multiline
                />

                <DialogContentText>
                    Additional remark
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="text"
                    value={details.remark}
                    onChange={(e)=>{handleValueChange(details, 'remark', e.target.value, setDetails)}}
                    fullWidth
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dispatch(hideModal()) }} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={() => onSubmitClick(dispatch, props.activeIncident.id, details)} 
                    color="secondary">
                    Close
                </Button>
            </DialogActions>
        </div>
    );
}

export default CloseModal;
