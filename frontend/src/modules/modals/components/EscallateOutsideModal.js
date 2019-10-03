import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';

// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'

const entities = [
    { label:"Police", value:'Police'},
    { label:"Legal", value:'Legal'},
    { label:"Other", value:'Other'},
]

const handleValueChange = (oldValues, field, value, setValue) => {
    let update = {...oldValues}
    update[field] = value
    setValue(update)
}

const EscallateOutsideModal = (props) => {

    const dispatch = useDispatch();
    const {incidentId} = props
    
    //maintains selected value in local state until change is confirmed
    const [escallationInfo, setEscallationInfo] = useState({entity:'Police', name:"", comment:""});

    return (
        <div>
            <DialogTitle id="form-dialog-title">Refer to organization entity: </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Describe outside entity.
                </DialogContentText>
                
                <TextField
                    autoFocus
                    id="entity"
                    select
                    label="entity"
                    // className={classes.textField}
                    value={escallationInfo.entity}
                    SelectProps={{
                        MenuProps: {
                        // className: classes.menu,
                        },
                    }}
                    onChange = {(e)=>{handleValueChange(escallationInfo, 'entity', e.target.value, setEscallationInfo)}}
                    margin="normal"
                    >
                    {entities.map(option => (   
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={escallationInfo.name}
                fullWidth
                onChange = {(e)=>{handleValueChange(escallationInfo, 'name', e.target.value, setEscallationInfo)}}
                />
                <TextField
                margin="dense"
                id="comment"
                label="Comment"
                type="text"
                value={escallationInfo.comment}
                fullWidth
                onChange = {(e)=>{handleValueChange(escallationInfo, 'comment', e.target.value, setEscallationInfo)}}
                />
            </DialogContent>
            

            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="primary">
                    Close
                </Button>
                <Button 
                    onClick={()=>{
                        //button action
                        dispatch(fetchUpdateWorkflow(incidentId, 'request-action', {comment:escallationInfo} ))
                        dispatch(hideModal())
                    }
                    } 
                    color="primary">
                    Refer to organization 
                </Button>
            </DialogActions>
        </div>
    );
}

export default EscallateOutsideModal;
