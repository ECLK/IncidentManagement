import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import DescriptionSection from './GuestFormDescriptionSection';
import CategorySection from './GuestFormCatogorySection';
import FileUploadSection from './GuestFormFileUploadSection';
import DateTimeSection from './GuestFormDateTimeSection';
import LocationSection from './GuestFromLocationSection';
import ContactSection from './GuestFormContactSection'

import {
    fetchElections,
    fetchCategories,
} from '../../shared/state/Shared.actions';

import {
    createGuestIncident,
    updateGuestIncident,
    updateGuestIncidentReporter,
    uploadFileGuest
} from '../../incident/state/incidentActions'

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
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});


const VerticalLinearStepper = (props) => {


    const [activeStep, setActiveStep] = useState(0);
    const [skippedSteps, setSkippedSets] = useState(new Set());
    const [incidentDescription, setIncidentDescription] = useState('');
    const [incidentElection, setIncidentElection] = useState('');
    const [incidentCatogory, setIncidentCatogory] = useState('');
    const [incidentFiles, setIncidentFiles] = useState(null);
    const [incidentDateTime, setIncidentDateTime] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm')
    });
    const [incidentLocation, setIncidentLocation] = useState('');
    const [incidentContact, setIncidentContact] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const dispatch = useDispatch()
    const { elections, categories } = useSelector((state) => (state.sharedReducer))
    const { activeIncident, activeIncidentReporter } = useSelector((state) => (state.incident))

    const incidentId = activeIncident.data ? activeIncident.data.id : null
    let incidentData = JSON.parse(JSON.stringify(activeIncident.data));
    let incidentReporterData = JSON.parse(JSON.stringify(activeIncidentReporter.data))

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchCategories());
    }, []);

    const handleNext = () => {
        switch (activeStep) {
            case 0:
                if(incidentId){
                    break
                }else{
                    dispatch(createGuestIncident({
                        election: incidentElection,
                        description: incidentDescription,
                        title: 'Guest user submit'
                    }))
                    break
                }
            case 1:
                if(incidentCatogory){
                    incidentData.category = incidentCatogory;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                }
                break
            case 2:
                //file upload
                if (incidentFiles) {
                    dispatch(uploadFileGuest(incidentId, incidentFiles))
                }
                break
            case 3:
                if(incidentDateTime.date || incidentDateTime.time){
                    let dateTime = moment(incidentDateTime.date + " " + incidentDateTime.time, 'YYYY-MM-DD HH:mm').format()
                    incidentData.occured_date = dateTime;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                }
                break
            case 4:
                //location
                if(incidentLocation){
                    incidentData.location = incidentLocation;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                }
                break
            case 5:
                //contact details
                if(incidentContact.name || incidentContact.phone || incidentContact.email){
                    incidentReporterData.name = incidentContact.name;
                    incidentReporterData.telephone = incidentContact.phone;
                    incidentReporterData.email = incidentContact.email;
                    dispatch(updateGuestIncidentReporter(incidentReporterData.id, incidentReporterData))
                }

        }

        setActiveStep(activeStep + 1)
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    };

    const handleReset = () => {
        setActiveStep(0)
    };

    const steps = [
        'Describe the incident',
        'Select the most suitable category for the incident',
        'Attach files related to incident',
        'When did this happened / will happen?',
        'Where did this happen?',
        'Your contact details'
    ];

    const optionalSteps = new Set([1,2,3,4,5])

    const isStepOptional = step => optionalSteps.has(step);

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        const skipped = new Set(skippedSteps.values());
        skipped.add(activeStep);
        setSkippedSets(skipped);
        setActiveStep(activeStep +1)
    };

    const isStepSkipped = (step) => {
        return skippedSteps.has(step);
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <DescriptionSection
                    handledDescriptionChange={setIncidentDescription}
                    handleElectionChange={setIncidentElection}
                    description={incidentDescription}
                    selectedElection={incidentElection}
                    elections={elections} />;
            case 1:
                return <CategorySection
                    categories={categories}
                    selectedCategory={incidentCatogory}
                    setSelectedCategory={setIncidentCatogory} />;
            case 2:
                return < FileUploadSection setSelectedFile={setIncidentFiles} />;
            case 3:
                return < DateTimeSection dateTime={incidentDateTime} setDateTime={setIncidentDateTime} />
            case 4:
                return < LocationSection location={incidentLocation} handledLocationChange={setIncidentLocation} />
            case 5:
                return < ContactSection contactDetials={incidentContact} handleContactDetailsChange={setIncidentContact} />
            default:
                return 'Unknown step';
        }
    }

    const { classes } = props;
    const GoBackLink = props => <Link to="/" {...props} />

    return (

        <div className={classes.root}>

            <Button variant="outlined" component={GoBackLink} > Go back </Button>
            <h3>Report Incident</h3>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {

                    const props = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    {isStepOptional(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSkip}
                                            className={classes.button}
                                        >
                                            Skip
                                    </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>)
                })}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
