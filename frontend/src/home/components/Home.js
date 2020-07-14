import React, { Component, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, CardHeader } from '@material-ui/core';
import ManagedIncidentList from './ManagedIncidentList';
import { useSelector } from 'react-redux';
import { userCan, USER_ACTIONS } from '../../user/userUtils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    card: {
        marginBottom: '2rem'
    }
});
const Home = ({classes, ...props}) =>{
    const user = useSelector(state => state.shared.signedInUser.data);
    const [state, setState] = useState({checked: false});

    
    const handleChange = (event) => {
        setState({...state, checked: event.target.checked});
    }
    var obj = {}

    if(state.checked == true){
        obj = { show_closed: "closed" }
    }else{
        obj = { assignee: "me" }
    }

    return (
        <Grid container>
            {userCan(user, null, USER_ACTIONS.CAN_REVIEW_ALL_INCIDENTS) && (
                <>
                <Grid item>
                    <Card xs={6} className={classes.card}>
                        <CardHeader
                            title="Incidents Assigned to You"
                        />
                        <Grid container>
                         <Grid style={{marginLeft:1150}} item>
                            <FormControlLabel
                            style={{textAlign:'right'}}
                            value="start"
                            control={<Checkbox checked={state.checked} onChange={handleChange}  color="primary" />}
                            label="With Archive"
                            labelPlacement="start"
                            />
                         </Grid>
                        </Grid>

                        
                        <CardContent>
                            <ManagedIncidentList
                                filters={ obj }
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* <Grid item style={{paddingTop:"10px"}}>
                    <Card xs={6}>
                        <CardHeader
                            title="Incidents Linked to You"
                        />
                        <CardContent>
                            <ManagedIncidentList
                                filters={ { user_linked: "me" } }
                            />
                        </CardContent>
                    </Card>
                </Grid> */}
                </>
            )}

            {!userCan(user, null, USER_ACTIONS.CAN_REVIEW_ALL_INCIDENTS) && (
                <>
                <Grid item style={{paddingTop:"10px"}}>
                    <Card xs={6} className={classes.card}>
                        <CardHeader
                            title="Your Incidents"
                        />
                        <CardContent>
                            <ManagedIncidentList
                                filters={ { user_linked: "me" } }
                            />
                        </CardContent>
                    </Card>
                </Grid>
                </>
            )}
        </Grid>

    )
}

export default withRouter(withStyles(styles, { withTheme: true })(Home));