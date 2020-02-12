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
    const defaultOrg = "eclk";
    const { users, divisions, activeIncident } = props;
    const dispatch = useDispatch();
    
    //maintains selected value in local state until change is confirmed
    const [division, setDivision] = useState(null);
    const [assignee, setAssignee] = useState(null);

    return (
        <div>
            <DialogTitle id="form-dialog-title">Change Assignee</DialogTitle>
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
