import React, { Component, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles, Tabs } from '@material-ui/core';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        backgroundColor: "transparent",
        boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        border: "1px solid #ccc"
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margingBottom: 50,
    }
});

/**
 * Basic Information TabView - (1)
 */
function BasicDetailTab(props){
    const { classes, incident, election } = props;

    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Incident Ref ID </Typography>
                                <Typography variant="h4" gutterBottom> {incident.refId} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Title </Typography>
                                <Typography gutterBottom> {incident.title} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Description </Typography>
                                <Typography gutterBottom> {incident.description} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Occurrence </Typography>
                                <Typography gutterBottom> {incident.occurence} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Date </Typography>
                                <Typography gutterBottom> <Moment format="YYYY/MM/DD">{incident.occured_date}</Moment> </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Incident Time </Typography>
                                <Typography gutterBottom> <Moment format="HH:mm">{incident.occured_date}</Moment> </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Logged Date </Typography>
                                <Typography gutterBottom> <Moment format="YYYY/MM/DD">{incident.createdDate}</Moment> </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Logged Time </Typography>
                                <Typography gutterBottom> <Moment format="HH:mm">{incident.createdDate}</Moment> </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Election </Typography>
                                <Typography variant="h6" gutterBottom> {election.name} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Category </Typography>
                                <Typography gutterBottom> {incident.category} </Typography>
                            </Grid>
                            {/* <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Sub Category </Typography>
                                <Typography gutterBottom> {this.state.category.sub_category} </Typography>
                            </Grid> */}
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Information Channel </Typography>
                                <Typography gutterBottom> {incident.infoChannel} </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>


        </div>
    );
}

/**
 * Location Information TabView - (2)
 */
function LocationTab(props){

    const { classes, incident, districts } = props;

    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Name / Description </Typography>
                                <Typography gutterBottom> {incident.location} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Address </Typography>
                                <Typography gutterBottom> {incident.address}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Coordinates </Typography>
                                <Typography gutterBottom> {incident.coordinates} </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Province </Typography>
                                <Typography variant="" gutterBottom> 
                                    {
                                        incident.province && districts.byCode[incident.province] ? 
                                        districts.byCode[incident.province].province : ""
                                    } 
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> District </Typography>
                                <Typography variant="" gutterBottom> 
                                    {
                                        incident.district && districts.byCode[incident.district] ? 
                                        districts.byCode[incident.district].name : ""
                                    } 
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Polling Division </Typography>
                                <Typography gutterBottom> {incident.pollingDivision} </Typography>
                            </Grid>
                        </Grid>
                        {/* 
                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Ward </Typography>
                                <Typography gutterBottom> {incident.ward} </Typography>
                            </Grid>
                        </Grid> */}

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Police Station </Typography>
                                <Typography gutterBottom> {incident.policeStation} </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

/**
 * Contact Information TabView - (3)
 */
function ContactTab(props){

    const { classes, reporter } = props;

    return (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Name </Typography>
                                <Typography gutterBottom> {reporter.name} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Contact Number </Typography>
                                <Typography gutterBottom> {reporter.telephone} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Email </Typography>
                                <Typography gutterBottom> {reporter.email} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography variant="caption" className={classes.label}> Address </Typography>
                                <Typography gutterBottom> {reporter.address} </Typography>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}


/**
 * Review Summary TabView - (4)
 */
function PoliceTab(props){
    const { classes, incident } = props;

    return (
        <div>
            <Grid container spacing={24} >
                <Grid item xs={12}>
                    <Paper elevation={1} className={classes.paper}>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Nature of incident  </Typography>
                                <Typography variant="h6" gutterBottom> {incident.nature_of_incident} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Complainers Name </Typography>
                                <Typography variant="h6" gutterBottom> {incident.complainers_name} </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.label}> Complainers Address </Typography>
                                <Typography variant="h6" gutterBottom> {incident.complainers_address} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Victims Name </Typography>
                                <Typography variant="h6" gutterBottom> {incident.victims_name} </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.label}> Victims Address </Typography>
                                <Typography variant="h6" gutterBottom> {incident.victims_address} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Respondents Name </Typography>
                                <Typography variant="h6" gutterBottom> {incident.respondents_name} </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography className={classes.label}> Respondents Address </Typography>
                                <Typography variant="h6" gutterBottom> {incident.respondents_address} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> No. of Vehicles Arrested </Typography>
                                <Typography variant="h6" gutterBottom> {incident.no_of_vehicles_arrested} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Steps Taken  </Typography>
                                <Typography variant="h6" gutterBottom> {incident.steps_taken} </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Typography className={classes.label}> Court Case Number  </Typography>
                                <Typography variant="h6" gutterBottom> {incident.court_case_no} </Typography>
                            </Grid>
                        </Grid>

                        


                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

function SummaryTabView(props){

    const {classes, incident, reporter, election, category, districts} = props

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className={classes.root}>
            <Tabs variant="fullWidth" value={currentTab} onChange={(e, val) => setCurrentTab(val)} indicatorColor="primary" >
                <LinkTab label="Basic Information" href="page1" />
                <LinkTab label="Location Information" href="page2" />
                <LinkTab label="Contact Information" href="page3" />
                <LinkTab label="Police Information" href="page4" />
            </Tabs>

            {currentTab === 0 && <TabContainer> <BasicDetailTab classes={classes} incident={incident} election={election} category={category} /> </TabContainer>}
            {currentTab === 1 && <TabContainer> <LocationTab classes={classes} incident={incident} districts={districts} /> </TabContainer>}
            {currentTab === 2 && <TabContainer> <ContactTab classes={classes} reporter={reporter} /> </TabContainer>}
            {currentTab === 3 && <TabContainer> <PoliceTab classes={classes} incident={incident} /> </TabContainer>}
        </div>
    )
}

export default withStyles(styles)(SummaryTabView);