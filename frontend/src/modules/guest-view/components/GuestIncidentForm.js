import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

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

import {
    moveStepper
} from '../state/guestViewActions'
import FileUploader from '../../shared/components/FileUploader';

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


    const [skippedSteps, setSkippedSets] = useState(new Set());
    const [incidentDescription, setIncidentDescription] = useState(null);
    const [incidentElection, setIncidentElection] = useState('');
    const [incidentCatogory, setIncidentCatogory] = useState('');
    const [incidentFiles, setIncidentFiles] = useState(null);
    const [incidentDateTime, setIncidentDateTime] = useState({
        date: null,
        time: null
    });
    const [incidentLocation, setIncidentLocation] = useState('');
    const [incidentContact, setIncidentContact] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const dispatch = useDispatch();
    const { elections, categories } = useSelector((state) => (state.sharedReducer));
    const { activeIncident, activeIncidentReporter } = useSelector((state) => (state.incident));
    const { activeStep, isFinished } = useSelector((state) => (state.guestView));

    const incidentId = activeIncident && activeIncident.data ? activeIncident.data.id : null
    let incidentData = incidentId ? JSON.parse(JSON.stringify(activeIncident.data)): {};
    let incidentReporterData = incidentId ? JSON.parse(JSON.stringify(activeIncidentReporter.data)) : null;

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchCategories());
    }, []);

    const stepDefinitions = {

        0:{
            title:'Describe the incident',
            content:<>
                    <DescriptionSection
                        handledDescriptionChange={setIncidentDescription}
                        handleElectionChange={setIncidentElection}
                        description={incidentDescription}
                        selectedElection={incidentElection}
                        elections={elections} />
                    <div style={{height:20}}></div>
                    < DateTimeSection 
                        dateTime={incidentDateTime} 
                        setDateTime={setIncidentDateTime} />
                    </>,
            handler: () => {
                //description and date time are mandatory
                //asssumed that once this step is completed user won't be able to update description or datetime
                if(!incidentId && incidentDateTime.date && incidentDateTime.time){
                    let dateTime = moment(
                                        incidentDateTime.date + " " + 
                                        incidentDateTime.time, 'YYYY-MM-DD HH:mm'
                                    ).format()
                    dispatch(createGuestIncident({
                        election: incidentElection,
                        description: incidentDescription,
                        title: 'Guest user submit',
                        occured_date: dateTime
                    }))
                }else{
                    if( incidentDescription && incidentDateTime.date && incidentDateTime.time){
                        dispatch(updateGuestIncident(incidentId, {election: incidentElection,}))
                    }
                }
            }
        },

        1:{
            title:'Describe the location',
            content: < LocationSection 
                        location={incidentLocation} 
                        handledLocationChange={setIncidentLocation} />,
            handler: () => {
                if(incidentLocation){
                    incidentData.location = incidentLocation;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                }
            }
        },

        2:{
            title:'Attach files related to incident',
            content: <FileUploader 
                            files={incidentFiles} 
                            setFiles={setIncidentFiles} 
                        />,
            handler: () => {
                if (incidentFiles) {
                    const fileData = new FormData();
                    for(var file of incidentFiles){
                        fileData.append("files[]", file);
                    }
                    dispatch(uploadFileGuest(incidentId, fileData))
                }
            }
        },

        3:{
            title:'Your contact details',
            content: < ContactSection 
                        contactDetials={incidentContact} 
                        handleContactDetailsChange={setIncidentContact} />,
            handler: () => {
                if(incidentContact.name || incidentContact.phone || incidentContact.email){
                    incidentReporterData.name = incidentContact.name;
                    incidentReporterData.telephone = incidentContact.phone;
                    incidentReporterData.email = incidentContact.email;
                    dispatch(updateGuestIncidentReporter(incidentReporterData.id, incidentReporterData))
                }
            }
        },

        4:{
            title:'Select the most suitable category for the incident',
            content: <CategorySection
                        categories={categories}
                        selectedCategory={incidentCatogory}
                        setSelectedCategory={setIncidentCatogory} />,
            handler: () => {
                if(incidentCatogory){
                    incidentData.category = incidentCatogory;
                    dispatch(updateGuestIncident(incidentId, incidentData))
                }else{
                    dispatch(moveStepper({step:activeStep+1})) 
                }
            }
        },
        
    }

    let steps = [];

    Object.keys(stepDefinitions).forEach(function(stepNumber) {
        steps[stepNumber] = stepDefinitions[stepNumber].title
    });

    const optionalSteps = new Set([1,2,3,4,5])

    const isStepOptional = step => optionalSteps.has(step);

    const handleBack = () => {
        dispatch(moveStepper({step:activeStep-1}))
    };

    const handleReset = () => {
        dispatch(moveStepper({step:0}))

    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        const skipped = new Set(skippedSteps.values());
        skipped.add(activeStep);
        setSkippedSets(skipped);
        dispatch(moveStepper({step:activeStep+1}))

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

    if(isFinished){
        props.history.push('/report/success')
    }

    return (

        <div className={classes.root}>

            <Button variant="outlined" onClick={()=>{window.history.back();}}> Back </Button>
            <h3>Report Incident</h3>

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => {

                    const props = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        if(index===3){
                            labelProps.optional = <Typography variant="caption">Optional - you may submit your complaint anonymously. If you choose to do so, you will not be able to obtain status updates from the Election Commission of Sri Lanka</Typography>;
                        }else{
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
                    <Typography>Your complaint has been submitted successfully</Typography>
                </Paper>
            )}
        </div>
    );
}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
};

export default withRouter (withStyles(styles)(VerticalLinearStepper));
