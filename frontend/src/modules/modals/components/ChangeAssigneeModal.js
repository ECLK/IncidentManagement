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

const ChangeAssigneeModal = (props) => {

    const dispatch = useDispatch();
    const {activeIncident} = useSelector(state => state.modalReducer.modalProps);
    
    //maintains selected value in local state until change is confirmed
    const [assignee, setAssignee] = useState(activeIncident.assignees[0].uid);

    return (
        <div>
            <DialogTitle id="form-dialog-title">Change Assignee</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select assignee for the incident
                </DialogContentText>
                <Select
                    value={assignee}
                    name="assignee"
                    displayEmpty
                    onChange={(e)=>{setAssignee(e.target.value)}}
                >
                    {props.users.map((user, index) => {
                        return (<MenuItem key={index} value={user.uid}>{user.displayname}</MenuItem>)
                    })}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="secondary">
                    Close
                </Button>
                <Button 
                    onClick={ () =>
                        {
                            dispatch(fetchUpdateWorkflow(props.activeIncident.id, "assign", {
                                assignee: assignee
                            } ));
                            dispatch(hideModal());
                        }
                    } 
                    color="primary">
                    Change Assignee
                </Button>
            </DialogActions>
        </div>
    );
}

export default ChangeAssigneeModal;
