import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter, useSelector, useDispatch } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormHelperText from '@material-ui/core/FormHelperText';

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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';

import {
    resetIncidentForm,
    submitInternalIncidentData,
    requestInternalIncidentData,

    fetchUpdateInternalIncidentData,
    updateInternalIncidentData

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
import IntlSelect from './IntlSelect';
import moment from 'moment';
import FileUploader from '../../shared/components/FileUploader';
import { showNotification } from '../../notifications/state/notifications.actions';
import TelephoneInput from './TelephoneInput';
import { useLoadingStatus } from '../../loading-spinners/loadingHook'

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

function IncidentFormInternal(props) {

    const [incidentData, setIncidentData] = useState({
        incidentType: "COMPLAINT",
        infoChannel: "",
        title: "",
        description: "",
        occurrence: null,
        occured_date: null,
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
        files: [],
        politicalParty: "",
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

    })

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [handleConfirmSubmit, setHandleConfirmSubmit] = useState(false);



    useEffect(() => {
        props.getChannels();
        props.getElections();
        props.getCategories();
        props.getProvinces();
        props.getDistricts();
        props.getDivisionalSecretariats();
        props.getGramaNiladharis();
        props.getPollingDivisions();
        props.getPollingStations();
        props.getPoliceStations();
        props.getPoliceDivisions();
        props.getWards();
        props.getPoliticalParties();
        props.resetIncidentForm();

        const { paramIncidentId } = props.match.params

        if (paramIncidentId) {
            props.getIncident(paramIncidentId);
        } else {
            props.resetActiveIncident();
        }
    },[incidentData])

    const handleSubmit = (values, actions) => {

        const { paramIncidentId } = props.match.params


        if (values.occured_date) {
            values.occured_date = moment(values.occured_date).format()
        } else {
            // to avoid sending an empty string to backend.
            values.occured_date = null
        }

        if (paramIncidentId) {
            props.updateInternalIncident(paramIncidentId, values);
            props.history.push(`/app/review/${paramIncidentId}`);
        } else {
            const fileData = new FormData();
            for (var file of incidentData.files) {
                fileData.append("files[]", file);
            }
            props.submitInternalIncident(values, fileData);
        }
    }

    const confirmDateAndSubmit = (values, actions) => {
        if (values.occured_date) {
            handleSubmit(values, actions)
        } else {
            setShowConfirmationModal(true);
            setHandleConfirmSubmit(() => { handleSubmit(values, actions) })
        }
    }

    const getInitialValues = () => {
        const { paramIncidentId } = props.match.params

        if (!paramIncidentId) {
            // new incident form
            return incidentData;
        }

        var initData = { ...incidentData, ...props.incident };
        const reporter = props.reporter;

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

    const handleFileSelect = (selectedFiles) => {
        setIncidentData({
            files: selectedFiles
        })
    }

    const tableRowAdd = (setFieldValue, fieldName, tableData, record) => {
        return new Promise((resolve, reject) => {
            tableData.push(record);
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }

    const tableRowDelete = (setFieldValue, fieldName, tableData, record) => {
        return new Promise((resolve, reject) => {
            const idx = record.tableData.id;
            tableData.splice(idx, 1);
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }

    const tableRowUpdate = (setFieldValue, fieldName, tableData, oldRecord, newRecord) => {
        return new Promise((resolve, reject) => {
            tableData[oldRecord.tableData.id] = newRecord;
            setFieldValue(fieldName, tableData);
            resolve();
        })
    }


    const customValidations = (values) => {
        //date time is validated here since it has to be compared with the occurrence. 
        //cannot do this with yup.
        let errors = {}
        const { occured_date, occurrence } = values;
        if (occured_date && occurrence) {
            switch (occurrence) {
                case "OCCURRED":
                    if (moment(occured_date).isBefore()) {
                        //selected date time is before curernt date. no error
                        break
                    } else {
                        errors['occured_date'] =
                            "Not a valid date/time for an occured incident";
                    }
                case "WILL_OCCUR":
                    if (moment(occured_date).isAfter()) {
                        //selected date time is after curernt date. no error
                        break
                    } else {
                        errors['occured_date'] =
                            "Invalid date/time for an incident that will occur in future.";
                    }
                default:
                    break
            }
        }
        return errors;
    }

    const hideConfirmModal = (confirmed) => {
        if (confirmed) {
            handleConfirmSubmit()
        }
        setShowConfirmationModal(false)
    }

    const { classes, isIncidentSubmitting, isIncidentUpdating } = props;
    const { paramIncidentId } = props.match.params

    //TODO: get isProcessing status from useLoadingStauts hook.

    const isProcessing = isIncidentSubmitting || isIncidentUpdating
    const reinit = paramIncidentId ? true : false;

    const politicalPartyLookup = Object.assign({},
        ...props.politicalParties.allCodes.map((c, k) => {
            const curParty = props.politicalParties.byCode[c];
            return { [curParty.code]: props.politicalParties.byCode[c].name }
        })
    );

    //validation schema
    const IncidentSchema = Yup.object().shape({
        incidentType: Yup.mixed().required('Required'),
        infoChannel: Yup.mixed().required('Required'),
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        occurrence: Yup.mixed().required('Required'),
        category: Yup.mixed().required('Required'),
        election: Yup.mixed().required('Required'),
        severity: Yup.mixed().required('Required'),
        reporterMobile: Yup.number(),
        reporterEmail: Yup.string().email('Invalid email'),
    });

    return (
        <div className={classes.root}>
            <Formik
                enableReinitialize={reinit}
                initialValues={getInitialValues()}
                onSubmit={(values, actions) => {
                    confirmDateAndSubmit(values, actions)
                }}
                validationSchema={IncidentSchema}
                validate={customValidations}
                render={
                    ({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        isValid }) => {
                        return (
                            <form
                                className={classes.container}
                                noValidate autoComplete="off"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    if (!isValid) {
                                        props.showNotification("Missing required values")
                                        window.scroll(0, 0)
                                    }
                                    handleSubmit(e)
                                }}
                            >
                                <div style={{ display: "none" }}>{props.incident.id}</div>
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
                                                {errors.incidentType ? (<FormHelperText>{errors.incidentType}</FormHelperText>) : null}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend">
                                                <div style={{ color: (errors.infoChannel && touched.infoChannel) ? 'red' : null }}>Incident receipt mode* </div>
                                            </FormLabel>

                                            {props.channels.map((c, k) => (
                                                <Button
                                                    key={k}
                                                    variant="contained"
                                                    color={(values.infoChannel == c.id) ? "primary" : ""}
                                                    className={classes.button}
                                                    onClick={() => { setFieldValue("infoChannel", c.id, true) }}
                                                >
                                                    {c.name}
                                                </Button>
                                            ))}

                                            <FormHelperText>
                                                {
                                                    (errors.infoChannel && touched.infoChannel) ?
                                                        <div style={{ color: 'red' }}>Required</div>
                                                        :
                                                        ''
                                                }
                                            </FormHelperText>

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
                                                error={touched.title && errors.title}
                                                helperText={touched.title ? errors.title : null}
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
                                                error={touched.description && errors.description}
                                                helperText={touched.description ? errors.description : null}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl
                                                error={touched.occurrence && errors.occurrence}
                                                component="fieldset"
                                                className={classes.formControl}>
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
                                                {errors.occurrence ? (<FormHelperText>{errors.occurrence}</FormHelperText>) : null}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <TextField
                                                id="occured_date"
                                                label="Incident date and time"
                                                type="datetime-local"
                                                value={values.occured_date}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={handleChange}
                                                inputProps={{
                                                    max: values.occurrence === "OCCURRED" ? moment().format("YYYY-MM-DDTHH:mm") : null,
                                                    min: values.occurrence === "WILL_OCCUR" ? moment().format("YYYY-MM-DDTHH:mm") : null
                                                }}
                                                error={errors.occured_date}
                                                helperText={errors.occured_date}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl
                                                className={classes.formControl}
                                                error={touched.category && errors.category}
                                            >
                                                <InputLabel htmlFor="category">Category*</InputLabel>
                                                <Select
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'category',
                                                    }}
                                                >
                                                    {props.categories.map((c, k) => (
                                                        <MenuItem value={c.id} key={k}>
                                                            <div className={classes.langCats}>
                                                                <div>{c.code}</div>
                                                                <div>|</div>
                                                                <div>{c.sub_category}</div>
                                                                <div>|</div>
                                                                <div> {c.sn_sub_category}</div>
                                                                <div>|</div>
                                                                <div> {c.tm_sub_category}</div>
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{(touched.category && errors.category) ? errors.category : ""}</FormHelperText>
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
                                            <FormControl error={touched.election && errors.election} className={classes.formControl}>
                                                <InputLabel htmlFor="election">Election*</InputLabel>
                                                <Select
                                                    value={values.election}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'election',
                                                        id: 'election',
                                                    }}
                                                >
                                                    <MenuItem value=""> <em>None</em> </MenuItem>
                                                    {props.elections.map((c, k) => (
                                                        <MenuItem value={c.code} key={k}>{c.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{(touched.election && errors.election) ? errors.election : ""}</FormHelperText>
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
                                                    {props.politicalParties.allCodes.map((c, k) => {
                                                        let currParty = props.politicalParties.byCode[c]
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
                                            <FormControl error={touched.severity && errors.severity} component="fieldset" className={classes.formControl}>
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
                                                <FormHelperText>{(touched.severity && errors.severity) ? errors.severity : ""}</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        {!paramIncidentId &&
                                            <Grid item xs={12} sm={6}>
                                                <InputLabel htmlFor="election" >Upload File</InputLabel>
                                                <FileUploader
                                                    files={incidentData.files}
                                                    setFiles={handleFileSelect}
                                                />
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
                                                    {props.provinces.allCodes.map((c, k) => {
                                                        let currProvince = props.provinces.byCode[c]
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
                                                    {props.districts.allCodes.map((c, k) => {
                                                        let currDistrict = props.districts.byCode[c]
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
                                                    dataObj={props.divisionalSecretariats}
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
                                                    dataObj={props.pollingDivisions}
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
                                                    dataObj={props.pollingStations}
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
                                                    dataObj={props.gramaNiladharis}
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
                                                    dataObj={props.policeStations}
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
                                                    dataObj={props.policeDivisions}
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
                                            <TelephoneInput
                                                className={classes.textField}
                                                name="reporterMobile"
                                                label="Complainer Mobile"
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
                                                error={touched.reporterEmail && errors.reporterEmail}
                                                helperText={touched.reporterEmail ? errors.reporterEmail : null}
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
                                                            onRowAdd: newData => tableRowAdd(setFieldValue, "injuredParties", values.injuredParties, newData),
                                                            onRowUpdate: (newData, oldData) => tableRowUpdate(setFieldValue, "injuredParties", values.injuredParties, oldData, newData),
                                                            onRowDelete: oldData => tableRowDelete(setFieldValue, "injuredParties", values.injuredParties, oldData)
                                                        }}
                                                        options={{
                                                            search: false,
                                                            paging: false
                                                        }}
                                                    />

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
                                                            onRowAdd: newData => tableRowAdd(setFieldValue, "respondents", values.respondents, newData),
                                                            onRowUpdate: (newData, oldData) => tableRowUpdate(setFieldValue, "respondents", values.respondents, oldData, newData),
                                                            onRowDelete: oldData => tableRowDelete(setFieldValue, "respondents", values.respondents, oldData)
                                                        }}
                                                        options={{
                                                            search: false,
                                                            paging: false
                                                        }}
                                                    />
                                                </Grid>

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
                                                            onRowAdd: newData => tableRowAdd(setFieldValue, "detainedVehicles", values.detainedVehicles, newData),
                                                            onRowUpdate: (newData, oldData) => tableRowUpdate(setFieldValue, "detainedVehicles", values.detainedVehicles, oldData, newData),
                                                            onRowDelete: oldData => tableRowDelete(setFieldValue, "detainedVehicles", values.detainedVehicles, oldData)
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
                        )
                    }}
            />

            {/* confirmation dialog */}
            <Dialog
                open={showConfirmationModal}
                onClose={() => hideConfirmModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Submit without occured date?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You are trying to submit an incident without an occured date.
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => hideConfirmModal(false)} color="primary">
                        Back
                        </Button>
                    <Button disabled={isProcessing} onClick={() => hideConfirmModal(true)} color="primary" autoFocus>
                        Submit
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => {
    return {

        incident: state.sharedReducer.activeIncident.data,
        reporter: state.sharedReducer.activeIncidentReporter,

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

        isIncidentSubmitting: state.loading.SUBMIT_INTERNAL_INCIDENT,
        isIncidentUpdating: state.loading.UPDATE_INTERNAL_INCIDENT,

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
        },

        showNotification: (message) => {
            dispatch(showNotification({ message }, null))
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(IncidentFormInternal)
    )
);
