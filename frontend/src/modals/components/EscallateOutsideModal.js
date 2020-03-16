import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';

// react-redux hooks
import { useDispatch, useSelector } from 'react-redux'

import { hideModal  } from '../state/modal.actions'
import { fetchUpdateWorkflow } from '../../ongoing-incidents/state/OngoingIncidents.actions'

const onSubmit = (dispatch, incidentId, escallationInfo) => {
    let entity = {};

    if(escallationInfo.entity_type === "other"){
        entity = {
            isInternalUser: false,
            type: escallationInfo.entity_type_other,
            name: escallationInfo.entity_user
        };
    }else{
        entity = {
            isInternalUser: true,
            type: escallationInfo.entity_type,
            name: escallationInfo.entity_user
        };
    }

    dispatch(fetchUpdateWorkflow(incidentId, 'request-action',
        {
            entity: entity,
            comment: escallationInfo.comment
        })
    )
    dispatch(hideModal())

}

const handleValueChange = (oldValues, field, value, setValue) => {
    let update = {...oldValues}
    update[field] = value
    setValue(update)
}

const EscallateOutsideModal = (props) => {
    const dispatch = useDispatch();
    const entities = useSelector(state => state.user.groups);
    const users = useSelector(state => state.user.users);
    const divisions = useSelector(state => state.user.divisions);
    const organizations = useSelector(state => state.user.organizations);
    const {incidentId} = props

    //maintains selected value in local state until change is confirmed
    const [escallationInfo, setEscallationInfo] = useState({
        entity_type: null,
        entity_type_other: null,
        entity_user: null,
        comment:""
    });
    const [division, setDivision] = useState(null);

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
                    label="Entity"
                    // className={classes.textField}
                    value={escallationInfo.entity_type}
                    SelectProps={{
                        MenuProps: {
                        // className: classes.menu,
                        },
                    }}
                    onChange = {(e)=>{handleValueChange(escallationInfo, 'entity_type', e.target.value, setEscallationInfo)}}
                    // onChange = {(e) => handleEntityTypeChange(e.target.value)}
                    margin="dense"
                    >
                    {organizations.allIds.map(id => (
                        <MenuItem key={id} value={id}>
                            {organizations.byIds[id].name}
                        </MenuItem>
                    ))}
                    <MenuItem value="other">Other</MenuItem>
                </TextField>

                { escallationInfo.entity_type === "other" && (
                    <>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Escalated User Name"
                            type="text"
                            value={escallationInfo.entity_user}
                            fullWidth
                            onChange = {(e)=>{handleValueChange(escallationInfo, 'entity_user', e.target.value, setEscallationInfo)}}
                        />
                    </>
                ) }

                <br />

                { escallationInfo.entity_type !== "other" && escallationInfo.entity_type !== null && (
                    <>
                    <DialogContentText>
                        Select Division.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="division"
                        select
                        label="Division"
                        value={division}
                        SelectProps={{
                            MenuProps: {
                            // className: classes.menu,
                            },
                        }}
                        onChange = {(e)=>{setDivision(e.target.value)}}
                        // onChange = {(e) => handleEntityTypeChange(e.target.value)}
                        margin="dense"
                        >
                        {divisions.idsByOrganization[escallationInfo.entity_type].map(did => (
                            <MenuItem key={did} value={did}>
                                {divisions.byIds[did].name}
                            </MenuItem>
                        ))}
                    </TextField>

                    { division !== null && (
                        <>
                        <DialogContentText>
                            Select Entity User.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            id="entity"
                            select
                            label="Entity User"
                            value={escallationInfo.entity_user}
                            SelectProps={{
                                MenuProps: {
                                // className: classes.menu,
                                },
                            }}
                            onChange = {(e)=>{handleValueChange(escallationInfo, 'entity_user', e.target.value, setEscallationInfo)}}
                            // onChange = {(e) => handleEntityTypeChange(e.target.value)}
                            margin="dense"
                            >
                            {users.idsByDivision[division].map(option => (
                                <MenuItem key={option} value={option}>
                                    {users.byIds[option].displayname}
                                </MenuItem>
                            ))}
                        </TextField>
                        </>
                    )}

                    </>
                ) }


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
                    onClick={()=>{  onSubmit(dispatch, incidentId, escallationInfo) }}
                    color="primary">
                    Refer to organization
                </Button>
            </DialogActions>
        </div>
    );
}

export default EscallateOutsideModal;
