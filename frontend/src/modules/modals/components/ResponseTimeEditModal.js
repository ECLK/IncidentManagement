import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { updateInternalIncident } from '../../incident/state/incidentActions';


var hourlyResponseTimes = []
for (var i = 1; i < 24; i++) {
    hourlyResponseTimes.push(i);
}


const ResponseTimeEditModal = (props) => {

    const dispatch = useDispatch();
    const {activeIncident} = props
    
    //maintains selected value in local state until change is confirmed
    const [allocatedTime, setAlocatedTime] = useState(activeIncident.response_time);

    return (
        <div>
            <DialogTitle id="form-dialog-title">Change Resopse Time</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Incident should be addressed and closed within: 
                </DialogContentText>
                <Select
                    value={allocatedTime}
                    name="responseTime"
                    displayEmpty
                    onChange={(e)=>{setAlocatedTime(e.target.value)}}
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
                <Button onClick={()=>{dispatch(hideModal())}} color="primary">
                    Close
                </Button>
                <Button 
                    onClick={()=>{
                        var activeIncidentUpdate = {...activeIncident}
                        activeIncidentUpdate.response_time = allocatedTime
                        dispatch(updateInternalIncident(activeIncident.id, activeIncidentUpdate))
                        dispatch(hideModal())
                    }
                    } 
                    color="primary">
                    Change Respose Time
                </Button>
            </DialogActions>
        </div>
    );
}

export default ResponseTimeEditModal;
