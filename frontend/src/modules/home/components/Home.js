import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, CardHeader } from '@material-ui/core';
import IncidentList from './IncidentList';
import ManagedIncidentList from './ManagedIncidentList';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    }
});
const Home = ({classes, ...props}) =>{

    return (
        <Grid container>
            <Grid item>
                <Card xs={6}>
                    <CardHeader 
                        title="Incidents Assigned to You"
                    />
                    <CardContent>
                        <ManagedIncidentList 
                            filters={ { assignee: "me" } }
                        />
                    </CardContent>
                </Card>
            </Grid>
            {/* <Grid item xs={1}></Grid> */}
            <Grid item style={{paddingTop:"10px"}}>
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
            </Grid>
        </Grid>
        
    )
}

export default withRouter(withStyles(styles, { withTheme: true })(Home));