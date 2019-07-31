import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import {
    submitIncidentBasicData,
    stepBackwardIncidentStepper,
    stepForwardIncidentStepper,
    fetchUpdateReporter,
    fetchUpdateIncident,
    resetIncidentForm
} from '../state/IncidentFiling.actions'
import {
    fetchCatogories,
    fetchDistricts,
    fetchPoliceStations,
    fetchPollingStations,
    fetchWards,
    fetchActiveIncidentData,
    resetActiveIncident,
    fetchDSDivisions
} from '../../shared/state/Shared.actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        marginBottom: 20,
    },
    textField: {
        width: '100%'
    },
    formControl: {
        width: '100%'
    },
    datetime: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
})

class IncidentFormInternal extends Component {

    state = {
        title: "",
        description: "",
        current_status: "OCCURRED",
        date: "",
        time: "",
        election_id: "",
        category: "",
        categories: [
            { id: "1", sub_category: "cat1" },
            { id: "2", sub_category: "cat2" },
            { id: "3", sub_category: "cat3" },
        ],
        optionsCity: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    handleSubmit = (values, actions) => {
        this.props.submitIncidentBasicDetails(values);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Formik
                    initialValues={this.state}
                    onSubmit={(values, actions) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     actions.setSubmitting(false);
                        // }, 1000);
                        this.handleSubmit(values, actions)
                    }}
                    render={props => (
                        <form className={classes.container} noValidate autoComplete="off" onSubmit={props.onSubmit}>

                            {/* basic incident detail information */}
                            <Paper className={classes.paper}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="category">Category</InputLabel>
                                            <Select
                                                value={props.values.category}
                                                onChange={props.handleChange}
                                                inputProps={{
                                                    name: 'category',
                                                    id: 'category',
                                                }}
                                            >
                                                {props.values.categories.map((c, k) => (
                                                    <MenuItem value={c.id} key={k}>{c.sub_category}</MenuItem>
                                                ))}

                                                <MenuItem value="Other"> Other </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            type="text"
                                            name="otherCat"
                                            label="If Other(Specify Here)"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.otherCat}
                                            className={classes.textField}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            type="text"
                                            name="description"
                                            label="Description"
                                            placeholder="Press enter for new lines."
                                            className={classes.textField}
                                            multiline
                                            value={props.values.description}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend">Occurrance</FormLabel>
                                            <RadioGroup
                                                aria-label="Current status"
                                                name="current_status"
                                                className={classes.group}
                                                value={props.values.current_status}
                                                onChange={props.handleChange}
                                                row={true}
                                            >
                                                <FormControlLabel value="OCCURRED" control={<Radio />} label="Occurred" />
                                                <FormControlLabel value="OCCURRING" control={<Radio />} label="Occurring" />
                                                <FormControlLabel value="WILL_OCCUR" control={<Radio />} label="Will Occur" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            margin="normal"
                                            id="date"
                                            label="Date"
                                            type="date"
                                            value={props.values.date}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={props.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <TextField
                                            id="time"
                                            label="Time"
                                            type="time"
                                            value={props.values.time}
                                            margin="normal"
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                            onChange={props.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="election_id" >Election</InputLabel>
                                            <Select
                                                value={props.values.election_id}
                                                onChange={props.handleChange}
                                                inputProps={{
                                                    name: 'election_id',
                                                    id: 'election_id',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Parliamentary Election 2020 </MenuItem>
                                                <MenuItem value={2}>Presedential Election 2021</MenuItem>
                                                <MenuItem value={3}>Provincial Election 2020</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                </Grid>
                            </Paper>

                            {/* Incident location information */}
                            <Paper className={classes.paper}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="location"
                                            label="Location / Description"
                                            className={classes.textField}
                                            // value={values.name}
                                            // onChange={handleChange('name')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            id="address"
                                            label="Address"
                                            className={classes.textField}
                                            // value={values.name}
                                            // onChange={handleChange('name')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="city"
                                            label="City"
                                            className={classes.textField}
                                            // value={values.name}
                                            // onChange={handleChange('name')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="province">Province</InputLabel>
                                            <Select
                                                value={this.state.province}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'province',
                                                    id: 'province',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"Western"}>Western</MenuItem>
                                                <MenuItem value={"Eastern"}>Eastern</MenuItem>
                                                <MenuItem value={"Nothern"}>Nothern</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="district">District</InputLabel>
                                            <Select
                                                value={this.state.age}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'district',
                                                    id: 'district',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="polling-division">Polling Division</InputLabel>
                                            <Select
                                                value={this.state.age}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'pollingDivision',
                                                    id: 'polling-division',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="polling-station">Polling Station</InputLabel>
                                            <Select
                                                value={this.state.age}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'pollingStation',
                                                    id: 'polling-station',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="police-station">Police Station</InputLabel>
                                            <Select
                                                value={this.state.age}
                                                onChange={this.handleChange}
                                                inputProps={{
                                                    name: 'police-station',
                                                    id: 'police-station',
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>

                            {/* action panel */}
                            <Paper className={classes.paper}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}>
                                        <Button variant="contained" className={classes.button}> Cancel</Button>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button}> Sumbit</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    )}
                />

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isIncidentBasicDetailsSubmitting: state.incidentReducer.guestIncidentForm.isSubmitting,
        incidentFormActiveStep: state.incidentReducer.guestIncidentForm.activeStep,

        isIncidentLoading: state.sharedReducer.activeIncident.isLoading,
        incident: state.sharedReducer.activeIncident.data,
        reporter: state.sharedReducer.activeIncidentReporter,

        incidentId: state.sharedReducer.activeIncident.data ? state.sharedReducer.activeIncident.data.id : null,
        reporterId: state.sharedReducer.activeIncidentReporter ? state.sharedReducer.activeIncidentReporter.id : null,

        categories: state.sharedReducer.categories,
        districts: state.sharedReducer.districts,
        provinces: state.sharedReducer.provinces,
        pollingStations: state.sharedReducer.pollingStations,
        policeStations: state.sharedReducer.policeStations,
        wards: state.sharedReducer.wards,
        elections: state.sharedReducer.elections,
        dsDivisions: state.sharedReducer.dsDivisions,

        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitIncidentBasicDetails: (values) => {
            dispatch(submitIncidentBasicData(values))
        },
        updateIncidentBasicDetails: (incidentId, incidentData) => {
            dispatch(fetchUpdateIncident(incidentId, incidentData));
        },
        submitContactDetails: (incidentId, reporterId, reporterData) => {
            dispatch(fetchUpdateReporter(incidentId, reporterId, reporterData))
        },
        stepBackward: () => {
            dispatch(stepBackwardIncidentStepper())
        },
        stepForward: () => {
            dispatch(stepForwardIncidentStepper())
        },

        getcategories: () => {
            dispatch(fetchCatogories())
        },
        getDistricts: () => {
            dispatch(fetchDistricts())
        },
        getPollingStations: () => {
            dispatch(fetchPollingStations())
        },
        getPoliceStations: () => {
            dispatch(fetchPoliceStations())
        },
        getWards: () => {
            dispatch(fetchWards())
        },

        getIncident: (incidentId) => {
            dispatch(fetchActiveIncidentData(incidentId))
        },

        resetActiveIncident: () => {
            dispatch(resetActiveIncident())
        },

        resetIncidentForm: () => {
            dispatch(resetIncidentForm())
        },
        getDSDivisions: () => {
            dispatch(fetchDSDivisions());
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(IncidentFormInternal);
