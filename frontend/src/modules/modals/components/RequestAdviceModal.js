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


const onSubmitClick = (dispatch, incidentId, comment, assignee) => {
    if(comment === "" || assignee === ""){
        // show error because mandatory
        return;
    }

    dispatch(fetchUpdateWorkflow(incidentId, "request-advice", {
        assignee: assignee,
        comment: comment
    } ));
    dispatch(hideModal());
}

const RequestAdviceModal = (props) => {
    const defaultOrg = "eclk";
    const { users, divisions } = props;
    const dispatch = useDispatch();

    //maintains selected value in local state until change is confirmed
    const [assignee, setAssignee] = useState(null);
    const [comment, setComment] = useState("");
    const [division, setDivision] = useState(null);

    return (
        <div>
            <DialogTitle id="form-dialog-title">Request for advice</DialogTitle>
            <DialogContent>
            <DialogContentText>
                    Select EC Division of the assignee
                </DialogContentText>
                <Select
                    value={division}
                    name="division"
                    displayEmpty
                    onChange={(e)=>{setDivision(e.target.value)}}
                >
                    {divisions.idsByOrganization[defaultOrg].map((did, index) => {
                        return (<MenuItem key={index} value={divisions.byIds[did].code}>{divisions.byIds[did].name}</MenuItem>)
                    })}
                </Select>
                
                { division !== null && (
                    <>
                    <DialogContentText>
                        Select Assignee from division
                    </DialogContentText>
                    <Select
                        value={assignee}
                        name="assignee"
                        displayEmpty
                        onChange={(e)=>{setAssignee(e.target.value)}}
                    >
                        {users.idsByDivision[division].map((uid, index) => {
                            return (<MenuItem key={index} value={users.byIds[uid].uid}>{users.byIds[uid].displayname}</MenuItem>)
                        })}
                    </Select>
                    </>
                )}

                <DialogContentText>
                    Comment
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="email"
                    value={comment}
                    onChange={(e)=>{setComment(e.target.value)}}
                    fullWidth
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { dispatch(hideModal()) }} color="secondary">
                    Close
                </Button>
                <Button 
                    onClick={() => onSubmitClick(dispatch, props.activeIncident.id, comment, assignee)} 
                    color="primary">
                    Send Request For Advice
                </Button>
            </DialogActions>
        </div>
    );
}

export default RequestAdviceModal;
