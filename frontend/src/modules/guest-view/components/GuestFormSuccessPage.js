import React from 'react';
import { withRouter } from "react-router";
import {useDispatch} from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {
    moveStepper
} from '../state/guestViewActions'

import {
    resetIncidentState
}
from '../../incident/state/incidentActions'


function GuestFormSuccessPage(props) {

    const dispatch = useDispatch();

    const handleButtonClick = (action) => {
        switch(action){
            case 'edit':
                dispatch(moveStepper({step:0}))
                props.history.push("/report");
                break;
            case 'status':
                props.history.push(`/status`);
                break;
            case 'create':
                dispatch(resetIncidentState())
                dispatch(moveStepper({step:0}))
                props.history.push(`/report`);
                break;
            default:
                break;
        }
        
    } 

    return (
        <Grid container spacing={16} style={{marginTop:'13%'}}>
            <Grid item xs={12}>
            <h1 style={{display:'flex', flexGrow:1, justifyContent:'center'}}>
                Your complaint has been submitted successfully
            </h1>
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={6} style={{marginTop:'30px'}}>
            <div style={{display:'flex', flexGrow:1, justifyContent:'space-around'}}>
                <Button variant='outlined' onClick={()=>{handleButtonClick('edit')}}>Add/ edit information</Button>
                {/* <Button variant='outlined' onClick={()=>{handleButtonClick('status')}}>Check  status</Button> */}
                <Button variant='outlined' onClick={()=>{handleButtonClick('create')}}>Create another complaint</Button>
            </div>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    );
}

export default withRouter(GuestFormSuccessPage);