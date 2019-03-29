import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';


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
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        margingBottom: 50,
    },
    label: {
        // color: '#757575'
    }
});

/**
 * Basic Information TabView - (1)
 */
class BasicDetailTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incident: props.incident,
            election: props.election,
            category: props.category,
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className={classes.paper}>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography className={classes.label}> Incident Ref ID </Typography>
                                    <Typography variant="h4" gutterBottom> {this.state.incident.token} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Title </Typography>
                                    <Typography gutterBottom> {this.state.incident.title} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Description </Typography>
                                    <Typography gutterBottom> {this.state.incident.description} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Occurence </Typography>
                                    <Typography gutterBottom> {this.state.incident.occurence} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Date </Typography>
                                    <Typography gutterBottom> <Moment format="YYYY/MM/DD" unix>{this.state.incident.created_date}</Moment> </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Time </Typography>
                                    <Typography gutterBottom> <Moment format="HH:mm" unix>{this.state.incident.created_date}</Moment> </Typography>
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
                                    <Typography variant="h6" gutterBottom> {this.state.election.name} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Category </Typography>
                                    <Typography gutterBottom> {this.state.category.top_category} </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Sub Category </Typography>
                                    <Typography gutterBottom> {this.state.category.sub_category} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Information Channel </Typography>
                                    <Typography gutterBottom> {this.state.incident.channel} </Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>



            </div>
        );
    }
}

/**
 * Location Information TabView - (2)
 */
class LocationTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incident: props.incident
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className={classes.paper}>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Name / Description </Typography>
                                    <Typography gutterBottom> Maligawata Road, Main Plaza </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Address </Typography>
                                    <Typography gutterBottom> 22/2, Maligawatta </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Coordinates </Typography>
                                    <Typography gutterBottom> 6.936047, 79.869638 </Typography>
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
                                    <Typography variant="" gutterBottom> Western Province </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> District </Typography>
                                    <Typography gutterBottom> Colombo District </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Polling Division </Typography>
                                    <Typography gutterBottom> Maligawatta Division </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Ward </Typography>
                                    <Typography gutterBottom> Ward 7 </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Police Station </Typography>
                                    <Typography gutterBottom> Maligawatta Police Station </Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


/**
 * Contact Information TabView - (3)
 */
class ContactTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incident: props.incident,
            reporter: props.reporter,
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className={classes.paper}>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Name </Typography>
                                    <Typography gutterBottom> {this.state.reporter.name} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Contact Number </Typography>
                                    <Typography gutterBottom> {this.state.reporter.contact} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Address </Typography>
                                    <Typography gutterBottom> {this.state.reporter.address} </Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

/**
 * Review Summary TabView - (4)
 */
class ReviewTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incident: props.incident,
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper elevation={1} className={classes.paper}>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography className={classes.label}> Incident Ref ID </Typography>
                                    <Typography variant="h4" gutterBottom> {this.state.incident.token} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Status </Typography>
                                    <Typography gutterBottom> Verified </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Severity </Typography>
                                    <Typography gutterBottom> Moderate </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Time since creation </Typography>
                                    <Typography gutterBottom> 10 hours </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Given reponse time </Typography>
                                    <Typography gutterBottom> 24 hours </Typography>
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
                                    <Typography variant="caption" className={classes.label}> Time since last action </Typography>
                                    <Typography gutterBottom> 4 hours ago </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Last assigned </Typography>
                                    <Typography gutterBottom> M Ekanayake (Police) </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

/**
 * Tabular componenet
 */
class NavTabs extends Component {
    state = {
        value: 0,
        incident: {
            "id": 1,
            "token": 1024,
            "election_id": 1,
            "reporter_id": 2,
            "occurence": "Occurence.OCCURED",
            "category": 11,
            "district_id": 0,
            "ward_id": 0,
            "police_station_id": 0,
            "polling_station_id": 0,
            "location": 4096,
            "address": 4096,
            "coordinates": 4096,
            "channel": 4096,
            "timing_nature": 1024,
            "validity": 1024,
            "title": "Illegal picketing event",
            "description": "Nulla laborum voluptate laboris incididunt. Laborum elit excepteur labore anim quis eu amet eiusmod velit esse. In ex cupidatat laborum id aliquip nisi sit non voluptate. Nisi dolor incididunt veniam ipsum. Ad quis cupidatat sit aute laborum excepteur cillum do officia. Proident reprehenderit ut dolor qui fugiat. Sint consectetur magna aute proident ex id adipisicing aute aute officia et nostrud.",
            "sn_title": null,
            "sn_description": null,
            "tm_title": null,
            "tm_description": null,
            "created_date": 1553154348,
            "updated_date": 1553154348
        },
        election: {
            id: 1,
            name: "Provincial Election 2019",
        },
        category: {
            id: 11,
            top_category: "Violence",
            sub_category: "Interrupting propaganda"
        },
        district: {
            id: 0,
            name: "Colombo",
            province: "Western"
        },
        reporter: {
            id: 2,
            name: "Jagath Mallawaarchichi",
            contact: "jagathm@gamil.com",
            address: "33/3, Church road, Battaramulla."
        }
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={this.handleChange} >
                            <LinkTab label="Basic Information" href="page1" />
                            <LinkTab label="Location Information" href="page2" />
                            <LinkTab label="Contact Information" href="page3" />
                            <LinkTab label="Review Summary" href="page4" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer> <BasicDetailTab classes={classes} incident={this.state.incident} election={this.state.election} category={this.state.category} /> </TabContainer>}
                    {value === 1 && <TabContainer> <LocationTab classes={classes} incident={this.state.incident} /> </TabContainer>}
                    {value === 2 && <TabContainer> <ContactTab classes={classes} reporter={this.state.reporter} /> </TabContainer>}
                    {value === 3 && <TabContainer> <ReviewTab classes={classes} incident={this.state.incident} /> </TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);