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
import Snackbar from '@material-ui/core/Snackbar';

import Checkbox from '@material-ui/core/Checkbox';

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
    fetchProvinces,
    fetchDistricts,
    fetchDivisionalSecretariats,
    fetchGramaNiladharis,
    fetchPollingDivisions,
    fetchPoliceStations,
    fetchPollingStations,
    fetchWards,
    fetchActiveIncidentData,
    resetActiveIncident
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
        title: "default title",
        description: "",
        current_status: "OCCURRED",
        date: "",
        time: "",
        otherCat: "",
        category: "",
        elections: [
            { value: '1', label: 'Presidential Election 2020' },
            { value: '2', label: 'Provincial Election 2020' },
            { value: '3', label: 'Parliamentary Election 2021' },
        ],
        election_id: "",
        location: "",
        address: "",
        city: "",
        province: "",
        district: "",
        divisionalSecretariat: "",
        gramaNiladhari: "",
        pollingDivision: "",
        polling_stations: [
            { value: '1', label: 'Thurston College, Colombo 03' },
            { value: '2', label: 'Royal College, Colombo 07' },
            { value: '3', label: 'St Peter\'s College, Colombo 04' },
        ],
        polling_division_id: "",
        police_stations: [
            { value: '1', label: 'Grandpass' },
            { value: '2', label: 'Pettah' },
            { value: '3', label: 'Maradana' },
        ],
        police_station_id: "",
        consent: false,
        reporter_name: "",
        reporter_type: "",
        reporter_address: "",
        reporter_mobile: "",
        reporter_landline: "",
        reporter_email: "",
    }

    componentDidMount() {
        this.props.getcategories();
        this.props.getProvinces();
        this.props.getDistricts();
        this.props.getDivisionalSecretariats();
        this.props.getGramaNiladharis();
        this.props.getPollingDivisions();
        this.props.getPollingStations();
        this.props.getPoliceStations();
        this.props.getPollingStations();
        this.props.getWards();

        this.props.resetIncidentForm();

        const {paramIncidentId} = this.props.match.params

        if (paramIncidentId) {
            this.props.getIncident(paramIncidentId);
        }else{
            this.props.resetActiveIncident();
        }
    }

    handleSubmit = (values, actions) => {
        this.props.submitIncidentBasicDetails(values);
        this.props.submitContactDetails()
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Formik
                    initialValues={this.state}
                    onSubmit={(values, actions) => {
                        this.handleSubmit(values, actions)
                    }}
                    render={
                        ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>

                                {/* basic incident detail information */}
                                <Paper className={classes.paper}>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="category">Category</InputLabel>
                                                <Select
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'category',
                                                    }}
                                                >
                                                    {this.props.categories.map((c, k) => (
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
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.otherCat}
                                                className={classes.textField}
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
                                                value={values.description}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormLabel component="legend">Occurrance</FormLabel>
                                                <RadioGroup
                                                    aria-label="Current status"
                                                    name="current_status"
                                                    className={classes.group}
                                                    value={values.current_status}
                                                    onChange={handleChange}
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
                                                value={values.date}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                id="time"
                                                label="Time"
                                                type="time"
                                                value={values.time}
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                                inputProps={{
                                                    step: 300, // 5 min
                                                }}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="election" >Election</InputLabel>
                                                <Select
                                                    value={values.election_id}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'election',
                                                        id: 'election',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {values.elections.map((c, k) => (
                                                        <MenuItem value={c.value} key={k}>{c.label}</MenuItem>
                                                    ))}
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
                                                value={values.location}
                                                onChange={handleChange}
                                                margin="normal"
                                                multiline
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <TextField
                                                id="address"
                                                label="Address"
                                                className={classes.textField}
                                                value={values.address}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                id="city"
                                                label="City"
                                                className={classes.textField}
                                                value={values.city}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="province">Province</InputLabel>
                                                <Select
                                                    value={values.province}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'province',
                                                        id: 'province',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.provinces.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="district">Districts</InputLabel>
                                                <Select
                                                    value={values.district}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'district',
                                                        id: 'district',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.districts.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="divisionalSecretariat">Divisional Secretariat</InputLabel>
                                                <Select
                                                    value={values.divisionalSecretariat}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'divisionalSecretariat',
                                                        id: 'divisionalSecretariat',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.divisionalSecretariats.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="gramaNiladhari">Grama Niladhari Division</InputLabel>
                                                <Select
                                                    value={values.gramaNiladhari}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'gramaNiladhari',
                                                        id: 'gramaNiladhari',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.gramaNiladharis.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="pollingDivision">Polling Division</InputLabel>
                                                <Select
                                                    value={values.pollingDivision}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'pollingDivision',
                                                        id: 'pollingDivision',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.pollingDivisions.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="polling_station_id">Polling Station</InputLabel>
                                                <Select
                                                    value={values.polling_station_id}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'polling_station_id',
                                                        id: 'polling_station_id',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.pollingStations.map((c, k) => (
                                                        <MenuItem value={c.value} key={k}>{c.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="police_station_id">Police Station</InputLabel>
                                                <Select
                                                    value={values.police_station_id}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'police_station_id',
                                                        id: 'police_station_id',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.policeStations.map((c, k) => (
                                                        <MenuItem value={c.value} key={k}>{c.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                {/* contact information of the complianer */}
                                <Paper className={classes.paper}>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporter_name"
                                                label="Reporter Name"
                                                className={classes.textField}
                                                value={values.reporter_name}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl} >
                                                <InputLabel htmlFor="reporter_type">Reporter Type</InputLabel>
                                                <Select
                                                    value={values.reporter_type}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'reporter_type',
                                                        id: 'reporter_type',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    <MenuItem value={"Individual"}>Individual</MenuItem>
                                                    <MenuItem value={"Organization"}>Organization</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="reporter_address"
                                                label="Reporter Address"
                                                className={classes.textField}
                                                value={values.reporter_address}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporter_mobile"
                                                label="Reporter Mobile"
                                                className={classes.textField}
                                                value={values.reporter_mobile}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporter_landline"
                                                label="Reporter Landline"
                                                className={classes.textField}
                                                value={values.reporter_landline}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporter_email"
                                                label="Reporter Email"
                                                className={classes.textField}
                                                value={values.reporter_email}
                                                onChange={handleChange}
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox 
                                                        id="consent"
                                                        name="consent"
                                                        checked={values.consent} 
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label="Yes. Complainer give concent to share his/her details outside 
                                                in order to support complaint to be processed."
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>

                                {/* action panel */}
                                <Grid container spacing={24}>
                                    <Grid item xs={12} style={{ textAlign: "center" }}>
                                        <Button variant="contained" className={classes.button}> Cancel</Button>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button}> Sumbit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                />

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.submitSuccessMessage}
                    onClose={this.handleSuccessMessageClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Incident submitted sucessfully!</span>}
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
        divisionalSecretariats: state.sharedReducer.divisionalSecretariats,
        gramaNiladharis: state.sharedReducer.gramaNiladharis,
        pollingDivisions: state.sharedReducer.pollingDivisions,
        pollingStations: state.sharedReducer.pollingStations,
        policeStations: state.sharedReducer.policeStations,
        wards: state.sharedReducer.wards,
        elections: state.sharedReducer.elections,

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
        getProvinces: () => {
            dispatch(fetchProvinces())
        },
        getDistricts: () => {
            dispatch(fetchDistricts())
        },
        getDivisionalSecretariats: () => {
            dispatch(fetchDivisionalSecretariats())
        },
        getGramaNiladharis: () => {
            dispatch(fetchGramaNiladharis());
        },
        getPollingDivisions: () => {
            dispatch(fetchPollingDivisions())
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
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(IncidentFormInternal);
