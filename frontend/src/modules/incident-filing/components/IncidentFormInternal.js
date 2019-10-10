import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';

import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MaterialTable from "material-table";

import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';

import {
    resetIncidentForm,
    submitInternalIncidentData,
    fetchUpdateInternalIncidentData
} from '../state/IncidentFiling.actions'
import {
    fetchChannels,
    fetchElections,
    fetchCategories,
    fetchProvinces,
    fetchDistricts,
    fetchDivisionalSecretariats,
    fetchGramaNiladharis,
    fetchPollingDivisions,
    fetchPoliceStations,
    fetchPollingStations,
    fetchPoliceDivisions,
    fetchWards,
    fetchActiveIncidentData,
    resetActiveIncident,
    fetchPoliticalParties,
} from '../../shared/state/Shared.actions';
import DropZoneBase from '../../shared/components/DropZoneBase';
import IntlSelect from './IntlSelect';
import moment from 'moment';

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
    radioItem: {
        margin: 0,
    },
    severityHigh: {
        color: red[600],
        '&$checked': {
            color: red[500],
        },
    },
    severityMedium: {
        color: orange[600],
        '&$checked': {
            color: orange[500],
        },
    },
    severityLow: {
        color: yellow[600],
        '&$checked': {
            color: yellow[500],
        },
    },
    checked: {},
    hide: {
        display: "none",
    },
    langCats: {
        display: "flex",
        "& div": {
            padding: "0 3px"
        }
    }
})

class IncidentFormInternal extends Component {

    state = {
        incidentType: "COMPLAINT",
        infoChannel: "",
        title: "",
        description: "",
        occurrence: "OCCURRED",
        occured_date: "",
        time: "",
        otherCat: "",
        category: "",
        election: "",
        severity: "",
        location: "",
        address: "",
        city: "",
        province: "",
        district: "",
        divisionalSecretariat: "",
        gramaNiladhari: "",
        pollingDivision: "",
        pollingStation: "",
        policeStation: "",
        policeDivision: "",
        reporterConsent: false,
        reporterName: "",
        reporterType: "",
        reporterAddress: "",
        reporterMobile: "",
        reporterLandline: "",
        reporterEmail: "",
        file: null,
        politicalParty:"",
        injuredParties: [],
        respondents: [],
        detainedVehicles: [],

        // police info
        nature_of_incident: "",
        complainers_name: "",
        complainers_address: "",
        victims_name: "",
        victims_address: "",
        respondents_name: "",
        respondents_address: "",
        no_of_vehicles_arrested: null,
        steps_taken: "",
        court_case_no: "",

    }

    componentDidMount() {
        this.props.getChannels();
        this.props.getElections();
        this.props.getCategories();
        this.props.getProvinces();
        this.props.getDistricts();
        this.props.getDivisionalSecretariats();
        this.props.getGramaNiladharis();
        this.props.getPollingDivisions();
        this.props.getPollingStations();
        this.props.getPoliceStations();
        this.props.getPoliceDivisions();
        this.props.getWards();
        this.props.getPoliticalParties();

        this.props.resetIncidentForm();

        const { paramIncidentId } = this.props.match.params

        if (paramIncidentId) {
            this.props.getIncident(paramIncidentId);
        } else {
            this.props.resetActiveIncident();
        }
    }

    handleSubmit = (values, actions) => {


        const { paramIncidentId } = this.props.match.params

        // for(var v in values["detainedVehicles"]){
        //     if(values["detainedVehicles"][v]["is_private"] === "null"){
        //         values["detainedVehicles"][v]["is_private"] = false;
        //     }
        // }


        if (values.occured_date) {
            values.occured_date = moment(values.occured_date).format()
        }

        if (paramIncidentId) {
            this.props.updateInternalIncident(paramIncidentId, values);
            this.props.history.push(`/app/review/${paramIncidentId}`);
        } else {
            this.props.submitInternalIncident(values, this.state.file);
            // this.props.history.push('/app/review');
        }
    }

    getInitialValues = () => {
        const { paramIncidentId } = this.props.match.params

        if (!paramIncidentId) {
            // new incident form
            return this.state;
        }

        var initData = { ...this.state, ...this.props.incident };
        const reporter = this.props.reporter;

        if (reporter) {
            Object.assign(initData, {
                "reporterName": reporter.name,
                "reporterType": reporter.reporter_type,
                "reporterEmail": reporter.email,
                "reporterMobile": reporter.telephone,
                "reporterAddress": reporter.address
            });
        }

        if (initData.occured_date) {
            initData.occured_date = moment(initData.occured_date).format("YYYY-MM-DDTHH:mm")
        }

        return initData;
    }

    handleFileSelect = (selectedFile) => {
        this.setState({
            file: selectedFile
        })
    }

    tableRowAdd = (setFieldValue, fieldName, tableData, record) => {
        return new Promise((resolve, reject) => {
            tableData.push(record);
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }

    tableRowDelete = (setFieldValue, fieldName, tableData, record) => {
        return new Promise((resolve, reject) => {            
            const idx = record.tableData.id;
            tableData.splice(idx, 1);
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }

    tableRowUpdate = (setFieldValue, fieldName, tableData, oldRecord, newRecord) => {
        return new Promise((resolve, reject) => {         
            tableData[oldRecord.tableData.id] = newRecord;
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }

    render() {
        const { classes } = this.props;
        const { paramIncidentId } = this.props.match.params

        const reinit = paramIncidentId ? true : false;

        const politicalPartyLookup = Object.assign({}, 
            ...this.props.politicalParties.allCodes.map((c, k) => {
                const curParty = this.props.politicalParties.byCode[c];
                return { [curParty.code]: this.props.politicalParties.byCode[c].name}
            })
        );

        return (
            <div className={classes.root}>
                <Formik
                    enableReinitialize={reinit}
                    initialValues={this.getInitialValues()}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        this.handleSubmit(values, actions)
                    }}
                    render={
                        ({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue }) => (
                            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <div style={{ display: "none" }}>{this.props.incident.id}</div>
                                {/* basic incident detail information */}
                                <Paper className={classes.paper}>
                                    <Typography variant="h5" gutterBottom>
                                        Basic Information
                                    </Typography>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12}>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormLabel component="legend">Type*</FormLabel>
                                                <RadioGroup
                                                    id="incidentType"
                                                    name="incidentType"
                                                    className={classes.group}
                                                    value={values.incidentType}
                                                    onChange={handleChange}
                                                    row
                                                >
                                                    <FormControlLabel value="COMPLAINT" control={<Radio color="primary" />} label="Complaint" />
                                                    <FormControlLabel value="INQUIRY" control={<Radio color="primary" />} label="Inquiry" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend">Incident receipt mode*</FormLabel>
                                            {this.props.channels.map((c, k) => (
                                                <Button
                                                    variant="contained"
                                                    color={(values.infoChannel == c.id) ? "primary" : ""}
                                                    className={classes.button}
                                                    onClick={() => { setFieldValue("infoChannel", c.id, false) }}
                                                >
                                                    {c.name}
                                                </Button>
                                            ))}

                                            {/* testbox to keep value of channel selected */}
                                            <TextField
                                                id="infoChannel"
                                                name="infoChannel"
                                                className={classes.hide}
                                                value={values.infoChannel}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="text"
                                                name="title"
                                                label="Title*"
                                                placeholder="Title"
                                                className={classes.textField}
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                type="text"
                                                name="description"
                                                label="Description*"
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
                                                <FormLabel component="legend">Occurrence*</FormLabel>
                                                <RadioGroup
                                                    name="occurrence"
                                                    id="occurrence"
                                                    className={classes.group}
                                                    value={values.occurrence}
                                                    onChange={handleChange}
                                                    row={true}
                                                >
                                                    <FormControlLabel value="OCCURRED" control={<Radio color="primary" />} label="Occurred" />
                                                    <FormControlLabel value="OCCURRING" control={<Radio color="primary" />} label="Occurring" />
                                                    <FormControlLabel value="WILL_OCCUR" control={<Radio color="primary" />} label="Will Occur" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                id="occured_date"
                                                label="Incident date and time*"
                                                type="datetime-local"
                                                value={values.occured_date}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="category">Category*</InputLabel>
                                                <Select
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'category',
                                                    }}
                                                >
                                                    {this.props.categories.map((c, k) => (
                                                        <MenuItem value={c.id} key={k}>
                                                            <div className={classes.langCats}>
                                                                <div>{c.sub_category}</div>
                                                                <div>|</div>
                                                                <div> {c.sn_sub_category}</div>
                                                                <div>|</div>
                                                                <div> {c.tm_sub_category}</div>
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                type="text"
                                                name="otherCat"
                                                label="If Other Category, please describe here"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.otherCat}
                                                className={classes.textField}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="election" >Election*</InputLabel>
                                                <Select
                                                    value={values.election}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'election',
                                                        id: 'election',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.elections.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="politicalParty">Reponsible Political Party</InputLabel>
                                                <Select
                                                    value={values.politicalParty}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'politicalParty',
                                                        id: 'politicalParty',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.politicalParties.allCodes.map((c, k) => {
                                                        let currParty = this.props.politicalParties.byCode[c]
                                                        return (
                                                            <MenuItem value={currParty.code} key={k}>
                                                                {currParty.name}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormLabel component="legend">Severity</FormLabel>
                                                <RadioGroup
                                                    name="severity"
                                                    id="severity"
                                                    value={values.severity}
                                                    onChange={handleChange}
                                                    row
                                                >
                                                    <FormControlLabel
                                                        value="1"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityLow,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "1") ? true : false}
                                                            />
                                                        }
                                                        label="1"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityLow,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="2"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityLow,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "2") ? true : false}
                                                            />
                                                        }
                                                        label="2"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityLow,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="3"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityLow,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "3") ? true : false}
                                                            />
                                                        }
                                                        label="3"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityLow,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="4"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityMedium,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "4") ? true : false}
                                                            />
                                                        }
                                                        label="4"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityMedium,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="5"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityMedium,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "5") ? true : false}
                                                            />
                                                        }
                                                        label="5"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityMedium,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="6"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityMedium,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "6") ? true : false}
                                                            />
                                                        }
                                                        label="6"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityMedium,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="7"
                                                        control={
                                                            <Radio
                                                                classes={{
                                                                    root: classes.severityMedium,
                                                                    checked: classes.checked,
                                                                }}
                                                                checked={(values.severity == "7") ? true : false}
                                                            />
                                                        }
                                                        label="7"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityMedium,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="8"
                                                        control={<Radio
                                                            classes={{
                                                                root: classes.severityHigh,
                                                                checked: classes.checked,
                                                            }}
                                                            checked={(values.severity == "8") ? true : false}
                                                        />}
                                                        label="8"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityHigh,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="9"
                                                        control={<Radio
                                                            classes={{
                                                                root: classes.severityHigh,
                                                                checked: classes.checked,
                                                            }}
                                                            checked={(values.severity == "9") ? true : false}
                                                        />}
                                                        label="9"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityHigh,
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="10"
                                                        control={<Radio
                                                            classes={{
                                                                root: classes.severityHigh,
                                                                checked: classes.checked,
                                                            }}
                                                            checked={(values.severity == "10") ? true : false}
                                                        />}
                                                        label="10"
                                                        labelPlacement="bottom"
                                                        className={classes.radioItem}
                                                        classes={{
                                                            label: classes.severityHigh,
                                                        }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        {!paramIncidentId &&
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel htmlFor="election" >Upload File</InputLabel>
                                                <DropZoneBase setSelectedFiles={this.handleFileSelect} />
                                            </Grid>
                                        }


                                    </Grid>
                                </Paper>

                                {/* Incident location information */}
                                <Paper className={classes.paper}>
                                    <Typography variant="h5" gutterBottom>
                                        Location Information
                                    </Typography>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="location"
                                                label="Location / Description"
                                                className={classes.textField}
                                                value={values.location}
                                                onChange={handleChange}
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
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                id="city"
                                                label="City"
                                                className={classes.textField}
                                                value={values.city}
                                                onChange={handleChange}
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
                                                    {this.props.provinces.allCodes.map((c, k) => {
                                                        let currProvince = this.props.provinces.byCode[c]
                                                        return (
                                                            <MenuItem value={currProvince.code} key={k}>
                                                                {currProvince.name}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="district">District</InputLabel>
                                                <Select
                                                    value={values.district}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'district',
                                                        id: 'district',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {this.props.districts.allCodes.map((c, k) => {
                                                        let currDistrict = this.props.districts.byCode[c]
                                                        return currDistrict.name !== 'NONE' &&
                                                            <MenuItem value={currDistrict.code} key={k}>
                                                                {currDistrict.name}
                                                            </MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="divisionalSecretariat">Divisional Secretariat</InputLabel>
                                                <IntlSelect
                                                    value={values.divisionalSecretariat}
                                                    handleChange={handleChange}
                                                    name='divisionalSecretariat'
                                                    dataObj={this.props.divisionalSecretariats}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="pollingDivision">Polling Division</InputLabel>
                                                <IntlSelect
                                                    value={values.pollingDivision}
                                                    handleChange={handleChange}
                                                    name='pollingDivision'
                                                    dataObj={this.props.pollingDivisions}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="pollingStation">Polling Station</InputLabel>
                                                <IntlSelect
                                                    value={values.pollingStation}
                                                    handleChange={handleChange}
                                                    name='pollingStation'
                                                    dataObj={this.props.pollingStations}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="gramaNiladhari">Grama Niladhari Division</InputLabel>
                                                <IntlSelect
                                                    value={values.gramaNiladhari}
                                                    handleChange={handleChange}
                                                    name='gramaNiladhari'
                                                    dataObj={this.props.gramaNiladharis}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="policeStation">Police Station</InputLabel>
                                                <IntlSelect
                                                    value={values.policeStation}
                                                    handleChange={handleChange}
                                                    name='policeStation'
                                                    dataObj={this.props.policeStations}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="policeDivision">Police Division</InputLabel>
                                                <IntlSelect
                                                    value={values.policeDivision}
                                                    handleChange={handleChange}
                                                    name='policeDivision'
                                                    dataObj={this.props.policeDivisions}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                {/* contact information of the complianer */}
                                <Paper className={classes.paper}>
                                    <Typography variant="h5" gutterBottom>
                                        Complainer Information
                                    </Typography>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporterName"
                                                name="reporterName"
                                                label="Complainer Name"
                                                className={classes.textField}
                                                value={values.reporterName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl className={classes.formControl} >
                                                <InputLabel htmlFor="reporterType">Complainer Type</InputLabel>
                                                <Select
                                                    value={values.reporterType}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'reporterType',
                                                        id: 'reporterType',
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
                                                id="reporterAddress"
                                                name="reporterAddress"
                                                label="Complainer Address"
                                                className={classes.textField}
                                                value={values.reporterAddress}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporterMobile"
                                                name="reporterMobile"
                                                label="Complainer Mobile"
                                                className={classes.textField}
                                                value={values.reporterMobile}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="reporterEmail"
                                                name="reporterEmail"
                                                label="Complainer Email"
                                                className={classes.textField}
                                                value={values.reporterEmail}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id="reporterConsent"
                                                        name="reporterConsent"
                                                        checked={values.reporterConsent}
                                                        onChange={handleChange}
                                                        color="primary"
                                                    />
                                                }
                                                label="Complainer details can be shared with external parties."
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>

                                {/* police details */}
                                <div>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h5" gutterBottom> Police Related Information </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Grid container spacing={24}>
                                            

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        id="complainers_name"
                                                        name="complainers_name"
                                                        label="Complainer Name"
                                                        className={classes.textField}
                                                        value={values.complainers_name}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="complainers_address"
                                                        name="complainers_address"
                                                        label="Complainers Address"
                                                        className={classes.textField}
                                                        value={values.complainers_address}
                                                        onChange={handleChange}
                                                    />
                                                </Grid>

                                                {/* <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        id="victims_name"
                                                        name="victims_name"
                                                        label="Victims Name"
                                                        className={classes.textField}
                                                        value={values.victims_name}
                                                        onChange={handleChange}
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12} sm={4}>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <MaterialTable
                                                        columns={[
                                                            { title: "Name", field: "name" },
                                                            { title: "Address", field: "address" },
                                                            {
                                                                title: "Political Affliation",
                                                                field: "political_affliation",
                                                                lookup: politicalPartyLookup
                                                            }
                                                        ]}
                                                        data={values.injuredParties}
                                                        title="Injured Parties"
                                                        editable={{
                                                            onRowAdd: newData => this.tableRowAdd(setFieldValue, "injuredParties", values.injuredParties, newData),
                                                            onRowUpdate: (newData, oldData) => this.tableRowUpdate(setFieldValue, "injuredParties", values.injuredParties, oldData, newData),
                                                            onRowDelete: oldData => this.tableRowDelete(setFieldValue, "injuredParties", values.injuredParties, oldData)
                                                        }}
                                                        options={{
                                                            search: false,
                                                            paging: false
                                                        }}
                                                    />
                                                    {/* <TextField
                                                        id="victims_address"
                                                        name="victims_address"
                                                        label="Victims Address"
                                                        className={classes.textField}
                                                        value={values.victims_address}
                                                        onChange={handleChange}
                                                    /> */}
                                                    
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <MaterialTable
                                                        columns={[
                                                            { title: "Name", field: "name" },
                                                            { title: "Address", field: "address" },
                                                            {
                                                                title: "Political Affliation",
                                                                field: "political_affliation",
                                                                lookup: politicalPartyLookup
                                                            }
                                                        ]}
                                                        data={values.respondents}
                                                        title="Respondents"
                                                        editable={{
                                                            onRowAdd: newData => this.tableRowAdd(setFieldValue, "respondents", values.respondents, newData),
                                                            onRowUpdate: (newData, oldData) => this.tableRowUpdate(setFieldValue, "respondents", values.respondents, oldData, newData),
                                                            onRowDelete: oldData => this.tableRowDelete(setFieldValue, "respondents", values.respondents, oldData)
                                                        }}
                                                        options={{
                                                            search: false,
                                                            paging: false
                                                        }}
                                                    />
                                                    {/* <TextField
                                                        id="respondents_name"
                                                        name="respondents_name"
                                                        label="Respondants Name"
                                                        className={classes.textField}
                                                        value={values.respondents_name}
                                                        onChange={handleChange}

                                                    /> */}
                                                </Grid>
                                                {/* <Grid item xs={12} sm={4}>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="respondents_address"
                                                        name="respondents_address"
                                                        label="Respondents Address"
                                                        className={classes.textField}
                                                        value={values.respondents_address}
                                                        onChange={handleChange}
                                                    />
                                                </Grid> */}

<Grid item xs={12}>
                                                    <MaterialTable
                                                        columns={[
                                                            { title: "Vehicle License Plate", field: "vehicle_no" },
                                                            {
                                                                title: "Vehicle Ownership",
                                                                field: "ownership",
                                                                lookup: {
                                                                    "government": "Government Vehicle",
                                                                    "private": "Private Vehicle"
                                                                }
                                                            }
                                                        ]}
                                                        data={values.detainedVehicles}
                                                        title="Detained Vehicles"
                                                        editable={{
                                                            onRowAdd: newData => this.tableRowAdd(setFieldValue, "detainedVehicles", values.detainedVehicles, newData),
                                                            onRowUpdate: (newData, oldData) => this.tableRowUpdate(setFieldValue, "detainedVehicles", values.detainedVehicles, oldData, newData),
                                                            onRowDelete: oldData => this.tableRowDelete(setFieldValue, "detainedVehicles", values.detainedVehicles, oldData)
                                                        }}
                                                        options={{
                                                            search: false,
                                                            paging: false
                                                        }}
                                                    />
                                                </Grid>

                                            </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>

                                {/* action panel */}
                                <Grid container spacing={24}>
                                    <Grid item xs={12} style={{ textAlign: "center" }}>
                                        <Button variant="contained" className={classes.button}> Cancel</Button>
                                        <Button type="submit" variant="contained" color="primary" className={classes.button}> Submit</Button>
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

        channels: state.sharedReducer.channels,
        categories: state.sharedReducer.categories,
        districts: state.sharedReducer.districts,
        provinces: state.sharedReducer.provinces,
        divisionalSecretariats: state.sharedReducer.divisionalSecretariats,
        gramaNiladharis: state.sharedReducer.gramaNiladharis,
        pollingDivisions: state.sharedReducer.pollingDivisions,
        pollingStations: state.sharedReducer.pollingStations,
        policeStations: state.sharedReducer.policeStations,
        policeDivisions: state.sharedReducer.policeDivisions,
        wards: state.sharedReducer.wards,
        elections: state.sharedReducer.elections,
        politicalParties: state.sharedReducer.politicalParties,

        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitInternalIncident: (values, fileData) => {
            dispatch(submitInternalIncidentData(values, fileData))
        },
        updateInternalIncident: (incidentId, incidentData) => {
            dispatch(fetchUpdateInternalIncidentData(incidentId, incidentData));
        },

        getChannels: () => {
            dispatch(fetchChannels())
        },
        getElections: () => {
            dispatch(fetchElections());
        },
        getCategories: () => {
            dispatch(fetchCategories())
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
            dispatch(fetchGramaNiladharis())
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
        getPoliceDivisions: () => {
            dispatch(fetchPoliceDivisions())
        },
        getWards: () => {
            dispatch(fetchWards())
        },
        getPoliticalParties: () => {
            dispatch(fetchPoliticalParties())
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

export default withRouter(compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(IncidentFormInternal));
