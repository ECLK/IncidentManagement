import React, { Component } from 'react';
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
 * Basic Information TabView - Component
 */
class BasicDetailView extends Component {

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
                                    <Typography variant="h6" gutterBottom> {this.state.incident.election} </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={24}>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Category </Typography>
                                    <Typography gutterBottom> {this.state.incident.category} category </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="caption" className={classes.label}> Sub Category </Typography>
                                    <Typography gutterBottom> {this.state.incident.category} sub-category </Typography>
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
 * Tabular componenet
 */
class NavTabs extends Component {
    state = {
        value: 0,
        incident: {
            "id": 5,
            "token": 1024,

            "election_id": 2,

            "reporter_id": 6,
            "occurence": "Occurence.OCCURED",
            "category": 2,
            "district_id": 0,
            "ward_id": 0,
            "police_station_id": 0,
            "polling_station_id": 0,
            "location": 4096,
            "address": 4096,
            "coordinates": 4096,

            "channel": "facebook",
            
            "timing_nature": 1024,
            "validity": 1024,
            "title": "Illegal picketing event",
            "description": "Nulla laborum voluptate laboris incididunt. Laborum elit excepteur labore anim quis eu amet eiusmod velit esse. In ex cupidatat laborum id aliquip nisi sit non voluptate. Nisi dolor incididunt veniam ipsum. Ad quis cupidatat sit aute laborum excepteur cillum do officia. Proident reprehenderit ut dolor qui fugiat. Sint consectetur magna aute proident ex id adipisicing aute aute officia et nostrud.",
            "sn_title": null,
            "sn_description": null,
            "tm_title": null,
            "tm_description": null,
            "created_date": 1553155218,
            "updated_date": 1553155218
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
                    {value === 0 && <TabContainer> <BasicDetailView classes={classes} incident={this.state.incident} /> </TabContainer>}
                    {value === 1 && <TabContainer>Page Two</TabContainer>}
                    {value === 2 && <TabContainer>Page Three</TabContainer>}
                    {value === 3 && <TabContainer>Page Four</TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

NavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);