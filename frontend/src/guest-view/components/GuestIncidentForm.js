import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";
import { useIntl } from "react-intl";
import ReCAPTCHA from "react-google-recaptcha";

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { changeLanguage } from "../../shared/state/sharedActions";
import Logo from "../../app/Logo";
import CircularProgress from '@material-ui/core/CircularProgress';

import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import DescriptionSection from './GuestFormDescriptionSection';
// import CategorySection from './GuestFormCatogorySection';
import FileUploadSection from './GuestFormFileUploadSection';
import DateTimeSection from './GuestFormDateTimeSection';
import LocationSection from './GuestFromLocationSection';
import ContactSection from './GuestFormContactSection';

import {
    fetchElections,
    fetchCategories,
    fetchChannels,

    requestIncidentCatogories,

} from '../../shared/state/sharedActions';

import {
    createGuestIncident,
    updateGuestIncident,
    updateGuestIncidentReporter,
    uploadFileGuest
} from '../../incident/state/incidentActions'

import {
    moveStepper,
} from '../state/guestViewActions'
import FileUploader from '../../files/components/FilePicker';

import {useLoadingStatus} from '../../loading-spinners/loadingHook'

const styles = theme => ({
    root: {
        width: '90%',
        marginTop: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 2,
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        marginTop: 15,
        marginLeft: -53,
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    }
});


const VerticalLinearStepper = (props) => {

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchCategories());
        dispatch(fetchChannels());
    }, []);

    const { formatMessage: f } = useIntl();

    const dispatch = useDispatch();
    const { elections, categories, channels } = useSelector((state) => (state.shared));
    
    let webInfoChannelId = "Web";
    // for(var channel of channels){
    //     if(channel.name === "Web"){
    //         webInfoChannelId = channel.id;
    //         break;
    //     }
    // }

    const { activeIncident, activeIncidentReporter } = useSelector((state) => (state.incident));
    const { activeStep, isLoadingIncident } = useSelector((state) => (state.guestView));

    const incidentId = activeIncident && activeIncident.data ? activeIncident.data.id : null
    let incidentData = incidentId ? JSON.parse(JSON.stringify(activeIncident.data)) : {};
    let incidentReporterData = incidentId ? JSON.parse(JSON.stringify(activeIncidentReporter.data)) : null;

    const [skippedSteps, setSkippedSets] = useState(new Set());
    const [incidentDescription, setIncidentDescription] = useState(incidentId ? incidentData.description : null);
    const [incidentElection, setIncidentElection] = useState(incidentId ? incidentData.election : "");
    
    const recaptchaRef = React.createRef();
    const [incidentRecaptcha, setIncidentRecaptcha] = useState(null);


    // const [incidentCatogory, setIncidentCatogory] = useState(incidentId? incidentData.category:"");
    const [incidentFiles, setIncidentFiles] = useState(null);
    const [incidentDateTime, setIncidentDateTime] = useState({
        date: incidentId && incidentData.occured_date ? moment(incidentData.occured_date).format('YYYY-MM-DD') : null,
        time: incidentId && incidentData.occured_date ? moment(incidentData.occured_date).format('HH:mm') : null,
    });

    // location section
    const [incidentLocation, setIncidentLocation] = useState(incidentId ? incidentData.location : '');
    const [incidentAddress, setIncidentAddress] = useState(incidentId ? incidentData.address : '');
    const [incidentCity, setIncidentCity] = useState(incidentId ? incidentData.city : '');

    const [incidentContact, setIncidentContact] = useState({
        name: incidentReporterData ? incidentReporterData.name : '',
        phone: incidentReporterData ? incidentReporterData.telephone : '',
        mobile: incidentReporterData ? incidentReporterData.mobile : '',
        email: incidentReporterData ? incidentReporterData.email : ''
    });
    const [formErrors, setFormErrors] = useState({})
    const isLoadingMetaData = useLoadingStatus([
        requestIncidentCatogories(),
    ])

    const getFormattedDateTime = () => {
        let dateTime = null;
        if (incidentDateTime.date && incidentDateTime.time) {
            dateTime = moment(
                incidentDateTime.date + " " +
                incidentDateTime.time, 'YYYY-MM-DD h:mm a'
            ).format()
        }
        return dateTime
    }

    const validInputs = () => {
        setFormErrors({ ...formErrors, incidentDescriptionErrorMsg: null, incidentElectionErrorMsg: null, incidentDatetimeErrorMsg: null })
        let errorMsg = { ...formErrors };
        let valid = true;

        if (!incidentDescription) {
            errorMsg = { ...errorMsg, incidentDescriptionErrorMsg: f({ id: "eclk.incident.management.report.incidents.description.error.message", defaultMessage: "Description is required" }) };
            valid = false;
        }
        if (!incidentElection) {
            errorMsg = { ...errorMsg, incidentElectionErrorMsg: f({ id: "eclk.incident.management.report.incidents.election.error.message", defaultMessage: "Election is required" }) };
            valid = false;
        }
        if (getFormattedDateTime() == null) {
            errorMsg = { ...errorMsg, incidentDatetimeErrorMsg: f({ id: "eclk.incident.management.report.incidents.datetime.error.message", defaultMessage: "Date and time are required" }) };
            valid = false;
        }
        if(!incidentRecaptcha){
            errorMsg = { ...errorMsg, incidentRecaptchaErrorMsg: f({ id: "eclk.incident.management.report.incidents.recaptcha.error.message", defaultMessage: "This verification is required" }) };
            valid = false;
        }
        setFormErrors({ ...errorMsg });
        return valid;
    }

    const stepDefinitions = {

        0: {
            title: f({ id: "eclk.incident.management.report.incidents.section.describe", defaultMessage: "Describe the incident" }),
            content: <>
                <DescriptionSection
                    handledDescriptionChange={setIncidentDescription}
                    handleElectionChange={setIncidentElection}
                    description={incidentDescription}
                    selectedElection={incidentElection}
                    elections={elections}
                    disableDescription={incidentId ? true : false}
                    formErrors={formErrors}
                />
                <div style={{ height: 20 }}></div>
                < DateTimeSection
                    dateTime={incidentDateTime}
                    setDateTime={setIncidentDateTime}
                    formErrors={formErrors}
                />
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                    onChange={ (e) => {
                        formErrors.incidentRecaptchaErrorMsg = null;
                        setIncidentRecaptcha(recaptchaRef.current.getValue()); 
                    }}
                />
                <p style={{ color:'red', marginTop:0}}>{formErrors.incidentRecaptchaErrorMsg}</p>
            </>,
            handler: () => {
                if (!incidentId) {
                    //creating new incident
                    if (validInputs()) {
                        let incidentData = {
                            election: incidentElection,
                            description: incidentDescription,
                            title: 'Guest user submit',
                            infoChannel: webInfoChannelId, //info channel is web by default.
                            recaptcha: incidentRecaptcha
                        }
                        const dateTime = getFormattedDateTime()
                        if (dateTime) {
                            incidentData['occured_date'] = dateTime;
                        }
                        dispatch(createGuestIncident(incidentData));
                    }
                } else {
                    //updating an existing incident.
                    //changing description/title is not allowed
                    if (validInputs()) {
                        let incidentUpdate = incidentData
                        incidentUpdate["election"] = incidentElection;
                        const dateTime = getFormattedDateTime()
                        if (dateTime) {
                            incidentUpdate['occured_date'] = dateTime
                        }
                        dispatch(updateGuestIncident(incidentId, incidentUpdate))
                    }
                }
            }
        },

        1: {
            title: f({ id: "eclk.incident.management.report.incidents.section.location", defaultMessage: "Describe the incident location" }),
            content: < LocationSection
                location={incidentLocation}
                handledLocationChange={setIncidentLocation}
                address={incidentAddress}
                handleAddressChange={setIncidentAddress}
                city={incidentCity}
                handleCityChange={setIncidentCity}
            />,
            handler: () => {
                if (incidentLocation) {
                    incidentData.location = incidentLocation;
                    incidentData.address = incidentAddress;
                    incidentData.city = incidentCity;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                } else {
                    dispatch(moveStepper({ step: activeStep + 1 }));
                }
            }
        },

        2: {
            title: f({ id: "eclk.incident.management.report.incidents.section.attachment", defaultMessage: "Attach files related to incident" }),
            content: <FileUploader
                files={incidentFiles}
                setFiles={setIncidentFiles}
            />,
            handler: () => {
                if (incidentFiles) {
                    const fileData = new FormData();
                    for (var file of incidentFiles) {
                        fileData.append("files[]", file);
                    }
                    dispatch(uploadFileGuest(incidentId, fileData))
                } else {
                    dispatch(moveStepper({ step: activeStep + 1 }));
                }
            }
        },

        3: {
            title: f({ id: "eclk.incident.management.report.incidents.section.contact", defaultMessage: "Your contact details" }),
            content: < ContactSection
                contactDetials={incidentContact}
                handleContactDetailsChange={setIncidentContact} />,
            handler: () => {
                if (incidentContact.name || incidentContact.phone || incidentContact.email) {
                    incidentReporterData.name = incidentContact.name;
                    incidentReporterData.telephone = incidentContact.phone;
                    incidentReporterData.mobile = incidentContact.mobile;
                    incidentReporterData.email = incidentContact.email;
                    dispatch(updateGuestIncidentReporter(incidentReporterData.id, incidentReporterData))
                } else {
                    dispatch(moveStepper({ step: activeStep + 1 }));
                }
            }
        },

        // 4:{
        //     title:'Select the most suitable category for the incident',
        //     content: <CategorySection
        //                 categories={categories}
        //                 selectedCategory={incidentCatogory}
        //                 setSelectedCategory={setIncidentCatogory} />,
        //     handler: () => {
        //         if(incidentCatogory){
        //             incidentData.category = incidentCatogory;
        //             dispatch(updateGuestIncident(incidentId, incidentData))
        //         }else{
        //             dispatch(moveStepper({step:activeStep+1})) 
        //         }

        //     }
        // },

    }

    let steps = [];

    Object.keys(stepDefinitions).forEach(function (stepNumber) {
        steps[stepNumber] = stepDefinitions[stepNumber].title
    });

    const optionalSteps = new Set([1, 2, 3, 4, 5])

    const isStepOptional = step => optionalSteps.has(step);

    const handleBack = () => {
        dispatch(moveStepper({ step: activeStep - 1 }))
    };

    const handleReset = () => {
        dispatch(moveStepper({ step: 0 }))

    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        const skipped = new Set(skippedSteps.values());
        skipped.add(activeStep);
        setSkippedSets(skipped);
        dispatch(moveStepper({ step: activeStep + 1 }))

    };

    const handleNext = () => {
        //each step handler will dispatch relevant incident update/create actions.
        //guest reducer will catch the each success action and increment the active step
        stepDefinitions[activeStep].handler()
    }

    const isStepSkipped = (step) => {
        return skippedSteps.has(step);
    }

    const getStepContent = (step) => {
        return stepDefinitions[step].content
    }

    const { classes } = props;
    const GoBackLink = props => <Link to="/" {...props} />

    if (activeStep === Object.keys(stepDefinitions).length) {
        return <Redirect to='/report/success' />
    }

    const isLoading = isLoadingIncident || isLoadingMetaData

    return (

        <div className={classes.root}>

            <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                    <Grid item xs={12} sm={6}>
                        <Logo />
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <div style={{ textAlign: "right" }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => dispatch(changeLanguage("si"))}
                            className={classes.button}
                        >
                            {" "}
                            Sinhala{" "}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => dispatch(changeLanguage("ta"))}
                            className={classes.button}
                        >
                            {" "}
                            Tamil{" "}
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => dispatch(changeLanguage("en"))}
                            className={classes.button}
                        >
                            {" "}
                            English{" "}
                        </Button>
                    </div>
                </Grid>
            </Grid>

            {/* <Button variant="outlined" onClick={() => { window.history.back(); }}> Back </Button> */}
            <Typography style={{ width: '100%' }} align="center" variant="h5" marginTop="20">
                {f({ id: "eclk.incident.management.report.incidents", defaultMessage: "Report Incident" })}
            </Typography>
            <Typography style={{ width: '100%' }} align="left" variant="" marginTop="20">
                {f({ id: "eclk.incident.management.report.incidents.helper.text", defaultMessage: "*fields are mandatory" })}
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {

                    const props = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        if (index === 3) {
                            // expected here to gives more information on 'contact info'
                            labelProps.optional = <Typography variant="caption">{f({ id: "eclk.incident.management.report.incidents.forms.label.optional", defaultMessage: "Optional" })}</Typography>;
                        } else {
                            labelProps.optional = <Typography variant="caption">{f({ id: "eclk.incident.management.report.incidents.forms.label.optional", defaultMessage: "Optional" })}</Typography>;
                        }
                    }
                    if (isStepSkipped(index)) {
                        props.completed = false;
                    }

                    return (
                        <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                            <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === 0 || isLoading}
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            {f({ id: "eclk.incident.management.report.incidents.forms.button.back", defaultMessage: "Back" })}
                                        </Button>
                                        {isStepOptional(activeStep) && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSkip}
                                                className={classes.button}
                                                disabled={isLoading}
                                            >
                                                {f({ id: "eclk.incident.management.report.incidents.forms.button.skip", defaultMessage: "Skip" })}
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={isLoading}
                                        >
                                            {activeStep === steps.length - 1 ?
                                                f({ id: "eclk.incident.management.report.incidents.forms.button.finish", defaultMessage: "Finish" }) :
                                                f({ id: "eclk.incident.management.report.incidents.forms.button.next", defaultMessage: "Next" })}
                                        </Button>
                                        {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                </div>
                            </StepContent>
                        </Step>)
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Your complaint has been submitted successfully</Typography>
                </Paper>
            )}
        </div>
    );
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withRouter(withStyles(styles)(VerticalLinearStepper));
