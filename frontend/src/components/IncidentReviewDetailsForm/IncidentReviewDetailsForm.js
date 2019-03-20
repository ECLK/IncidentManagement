
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 1,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 1,
    },
    subTitle: {
        marginTop:theme.spacing.unit * 2,
    }
});

class IncidentReviewDetailsForm extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper className={classes.root} elevation={1}>

                    <Typography variant="h6" component="h3" className={classes.subTitle}>
                        Incident Details.
                    </Typography>
                    {this.props.incident &&
                    <React.Fragment>
                    <Typography component="p">
                        Title: {this.props.incident.title}
                    </Typography>
                    <Typography component="p">
                        Description: {this.props.incident.description}
                    </Typography>
                    <Typography component="p">
                        Status: {this.props.incident.occurance}
                    </Typography>
                    <Typography component="p">
                        Date: {this.props.incident.date}
                    </Typography>
                    <Typography component="p">
                        Time: {this.props.incident.time}
                    </Typography>
                    <Typography component="p">
                        Election: {this.props.incident.occurance}
                    </Typography>
                    <Typography component="p">
                        Catagory: {this.props.incident.occurance}
                    </Typography>
                    </React.Fragment>}

                    <Typography variant="h6" component="h3" className={classes.subTitle}>
                        Incident Location Details.
                    </Typography>
                    {this.props.incident &&
                    <React.Fragment>
                    <Typography component="p">
                        Location name/description: {this.props.incident.title}
                    </Typography>
                    <Typography component="p">
                        Address: {this.props.incident.description}
                    </Typography>
                    <Typography component="p">
                        Coordinates: {this.props.incident.occurance}
                    </Typography>
                    <Typography component="p">
                        Province: {this.props.incident.date}
                    </Typography>
                    <Typography component="p">
                        District: {this.props.incident.time}
                    </Typography>
                    <Typography component="p">
                        Polling division: {this.props.incident.occurance}
                    </Typography>
                    <Typography component="p">
                        Ward: {this.props.incident.occurance}
                    </Typography>
                    <Typography component="p">
                        Police Station: {this.props.incident.occurance}
                    </Typography>
                    </React.Fragment>}

                    <Typography variant="h6" component="h3" className={classes.subTitle}>
                        Incident Contact Details.
                    </Typography>
                    {this.props.reporter &&
                    <React.Fragment>
                    <Typography component="p">
                        Location name/description: {this.props.reporter.name}
                    </Typography>
                    <Typography component="p">
                        Address: {this.props.reporter.email}
                    </Typography>
                    <Typography component="p">
                        Coordinates: {this.props.reporter.telephone}
                    </Typography>
                    <Typography component="p">
                        Province: {this.props.reporter.address}
                    </Typography>
                    </React.Fragment>}
                </Paper>
            </div>
        );
    };
}

IncidentReviewDetailsForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentReviewDetailsForm);