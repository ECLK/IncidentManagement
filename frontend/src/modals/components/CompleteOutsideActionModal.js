import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'



const CompleteOutsideActionModal = (props) => {

    const dispatch = useDispatch();
    const {incidentId, startEventId} = props;
    
    const [comment, setComment] = useState("");

    return (
        <div>
            <DialogTitle id="form-dialog-title"> Mark as action complete?  </DialogTitle>
            <DialogContent style={{width:400}}>
            <DialogContentText>
                Describe the outcome from the outside entity.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              value={comment}
              onChange={(e)=>{setComment(e.target.value)}}
              fullWidth
              multiline
            />
          </DialogContent>
            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={()=>{
                        dispatch(fetchUpdateWorkflow(incidentId,'complete-action', {comment,start_event:startEventId}))
                        dispatch(hideModal())
                    }
                    } 
                    color="primary">
                    Complete Action
                </Button>
            </DialogActions>
        </div>
    );
}

export default CompleteOutsideActionModal;
