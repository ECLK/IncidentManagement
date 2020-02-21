import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

// react-redux hooks
import { useDispatch } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'


const VerifyConfirmModal = (props) => {

    const dispatch = useDispatch();
    const {incidentId} = props;
    
    const [comment, setComment] = useState("");
    let proof = false;

    return (
        <div>
            <DialogTitle id="form-dialog-title">Verify this Incident?  </DialogTitle>
            <DialogContent style={{width:400}}>
            <DialogContentText>
                Comment(optional)
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
            <Checkbox
              id="proof"
              onChange={(e)=>{
                  proof = !proof
              }}
            /> verified with proof
          </DialogContent>
            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={()=>{
                        dispatch(fetchUpdateWorkflow(incidentId,'verify', {comment, proof}))
                        dispatch(hideModal())
                    }
                    } 
                    color="primary">
                    Verify
                </Button>
            </DialogActions>
        </div>
    );
}

export default VerifyConfirmModal;
