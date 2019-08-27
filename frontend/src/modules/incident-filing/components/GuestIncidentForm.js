import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'

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
import DateTimeSection from './GuestFormDateTimeSection'


import {
    submitIncidentBasicData,
    fetchUpdateReporter,
    fetchUpdateIncident,
    resetIncidentForm,
    incidentFileUpload,
    publicFileUpload
} from '../state/IncidentFiling.actions'
import {
    fetchElections,
    fetchCategories,
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
    const [incidentDescription, setIncidentDescription] = useState('');
    const [incidentElection, setIncidentElection] = useState('');
    const [incidentCatogory, setIncidentCatogory] = useState('');
    const [incidentFiles, setIncidentFiles] = useState([]);
    const [incidentDateTime, setIncidentDateTime] = useState({ date: null, time: null });
    const [incidentLocation, setIncidentLocation] = useState({});
    const [incidentContact, setIncidentContact] = useState({});

    const dispatch = useDispatch()

    const {elections, categories, activeIncident} = useSelector((state)=>(state.sharedReducer))
    const incidentId = activeIncident.data.id

    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchCategories());
    }, []);

    const handleNext = () => {
        switch(activeStep){
            case 0:
                dispatch(submitIncidentBasicData({
                    election: incidentElection,
                    description: incidentDescription,
                    title:'Guest user submit'
                }))
                break
            case 1:
                dispatch(fetchUpdateIncident(incidentId, {category:incidentCatogory}))
                break
            case 2:
                if(incidentFiles[0]){
                    const formData = new FormData();
                    formData.append("file", incidentFiles[0]);
                    dispatch(publicFileUpload(incidentId, formData))
                }
                break
            case 3:
                //datetime
                break
            case 4:
                //location
                break
            case 5: 
                dispatch(fetchUpdateReporter(incidentId, incidentContact))

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
        'Your contact details(optional)'
    ];

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
                return <FileUploadSection setSelectedFile={setIncidentFiles}/>;
            case 3:
                return < DateTimeSection dateTime={incidentDateTime} setDateTime={setIncidentDateTime}/>
            default:
                return 'Unknown step';
        }
    }

    const { classes } = props;

    return (

        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
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
                    </Step>
                ))}
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
