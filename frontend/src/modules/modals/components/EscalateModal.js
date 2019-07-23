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


const EscalateModal = (props) => {

    const dispatch = useDispatch();
    
    return (
        <div>
            <DialogTitle id="form-dialog-title">Escalate Incident</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This would escalate the incident to upper level 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{dispatch(hideModal())}} color="secondary">
                    Close
                </Button>
                <Button 
                    onClick={ () =>
                        {
                            dispatch(fetchUpdateWorkflow(props.incidentId, "escalate", {}));
                            dispatch(hideModal())
                        }
                    } 
                    color="primary">
                    Escalate
                </Button>
            </DialogActions>
        </div>
    );
}

export default EscalateModal;
