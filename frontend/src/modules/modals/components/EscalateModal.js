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

const hourlyResponseTimes = []
for (var i = 1; i < 24; i++) {
    hourlyResponseTimes.push(i);
}

const onSubmitClick = (dispatch, incidentId, comment, responseTime) => {
    if(comment === "" || responseTime === null){
        // show error because mandatory
        return;
    }

    dispatch(fetchUpdateWorkflow(incidentId, "escalate", {
        comment: comment,
        responseTime: responseTime
    } ));
    dispatch(hideModal());
}

const EscalateModal = (props) => {
    const [comment, setComment] = useState("");
    const [responseTime, setResponseTime] = useState(null);

    const dispatch = useDispatch();
    
    return (
        <div>
            <DialogTitle id="form-dialog-title">Escalate Incident</DialogTitle>
            <DialogContent>
                {/* <DialogContentText>
                    This would escalate the incident to upper level 
                </DialogContentText> */}

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

                <DialogContentText>
                    Response Time
                </DialogContentText>
                <Select
                    value={responseTime}
                    name="responseTime"
                    displayEmpty
                    onChange={(e)=>{setResponseTime(e.target.value)}}
                >
                    <MenuItem value="" disabled>
                        N/A
                        </MenuItem>
                    {hourlyResponseTimes.map((value, index) => {
                        return (<MenuItem key={index} value={value}>{value}</MenuItem>)
                    })}
                </Select> <DialogContentText>hours</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="secondary">
                    Close
                </Button>
                <Button 
                    onClick={() => onSubmitClick(dispatch, props.incidentId, comment, responseTime)} 
                    color="primary">
                    Escalate
                </Button>
            </DialogActions>
        </div>
    );
}

export default EscalateModal;
