
// EditUserDialog.js
import { compose } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from "react-router";

import { Formik, withFormik } from 'formik';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import StepContent from '@material-ui/core/StepContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import { IncidentBasicDetailsForm } from '../../../components/IncidentBasicDetailsForm';
import { IncidentLocationDetailsForm } from '../../../components/IncidentLocationDetailsForm';
import { IncidentContactDetailsForm } from '../../../components/IncidentContactDetailsForm';
import { IncidentReviewDetailsForm } from '../../../components/IncidentReviewDetailsForm';


import { submitIncidentBasicData, stepBackwardIncidentStepper, stepForwardIncidentStepper, fetchUpdateReporter, fetchUpdateIncident, fetchIncidentData } from '../state/IncidentFiling.actions'
import { fetchCatogories, fetchDistricts, fetchPoliceStations, fetchPollingStations, fetchWards } from '../../shared/state/Shared.actions';


const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 4 * theme.spacing.unit,
    },
    textField: {
        marginLeft: 4 * theme.spacing.unit,
        marginRight: 4 * theme.spacing.unit,
        width: 500,
    },
    description: {
        marginLeft: 4 * theme.spacing.unit,
        marginRight: 4 * theme.spacing.unit,
        width: 1000,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    formControl: {
        marginTop: 4 * theme.spacing.unit,
        marginLeft: 4 * theme.spacing.unit,
        minWidth: 120,
    },

    //stepper styling
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 3,
    },

    // warpper for button and circular loading
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },


    // radio select
    radioSelecLabel: {
        width: 1000,
    },

    // calander
    dataTimePickers: {
        width: '50%',
        marginLeft: 4 * theme.spacing.unit,
    },

    //catogories
    otherCat: {
        width: '50%',
        marginTop: 4 * theme.spacing.unit,
        marginLeft: 4 * theme.spacing.unit
    }
});

function getSteps() {
    return [
        {
            id:'eclk.incident.management.filing.guest.form.steps.basic.details',
            description:'Submit Incident Details',
            defaultMessage:'Submit Incident Details'
        },
        {
            id:'eclk.incident.management.filing.guest.form.steps.location.details',
            description:'Submit Incident Location Details',
            defaultMessage:'Submit Incident Location Details'
        },{
            id:'eclk.incident.management.filing.guest.form.steps.contact.details',
            description:'Submit Contact Details',
            defaultMessage:'Submit Contact Details'
        },{
            id:'eclk.incident.management.filing.guest.form.steps.review.details',
            description:'Add additoinal details',
            defaultMessage:'Add additoinal details'
        }];
}

function getStepContent(step, props, formikProps, state) {
    switch (step) {
        case 0:
            return (<IncidentBasicDetailsForm {...props} {...formikProps} initialValues={state.incidentBasicDetails} />);
        case 1:
            return (<IncidentLocationDetailsForm {...props} {...formikProps} initialValues={state.incidentLocationDetails} />)
        case 2:
            return (<IncidentContactDetailsForm {...props} {...formikProps} initialValues={state.incidentContactDetails} />);
        case 3:
            return (<IncidentReviewDetailsForm/>);
        default:
            return 'Unknown step';
    }
}

class IndicdentForm extends Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        incidentBasicDetails: {},
        incidentLocationDetails: {},
        incidentContactDetails: {},
        incidentAdvancedDetails: {},

        formInitData: null
    };

    componentDidMount() {
        this.props.getCategorys();
        this.props.getDistricts();
        this.props.getPoliceStations();
        this.props.getPollingStations();
        this.props.getWards();

        if(this.props.paramIncidentId){
            this.props.getIncident(this.props.paramIncidentId);
        }
    }

    isStepOptional = step => step === 1 || step === 2;

    handleNext = (onSubmit, values) => {
        this.saveStepValues(values);
        onSubmit();
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = (values) => {
        this.saveStepValues(values)
        this.props.stepBackward();
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    handleSubmit = (values, actions) => {
        console.log(this.props);
        // diffreent endpoints have to be called in different steps.
        switch (this.props.incidentFormActiveStep) {
            case 0:
                if (this.props.incidentId) {
                    this.props.updateIncidentBasicDetails(this.props.incidentId, values);
                } else {
                    this.props.submitIncidentBasicDetails(values);
                }
                break;
            case 1:
                this.props.updateIncidentBasicDetails(this.props.incidentId, values);
                break;
            case 2:
                this.props.submitContactDetails(this.props.reporterId, values);
                break;
            case 3:
                break;
            default:
                return false;
        }
    }

    getInitialValues = () => {
        var initData = { ...this.props.incident };
        const reporter = this.props.reporter;

        if(reporter){
            Object.assign(initData, {
                "reporter_name": reporter.name,
                "reporter_type": reporter.reporter_type,
                "reporter_email": reporter.email,
                "reporter_telephone": reporter.telephone,
                "reporter_address": reporter.address
            });
        }

        switch (this.props.incidentFormActiveStep) {
            case 0:
                return { ...initData, ...this.state.incidentBasicDetails };
            case 1:
                return { ...initData, ...this.state.incidentLocationDetails };
            case 2:
                return { ...initData, ...this.state.incidentContactDetails };
            default:
                return false;
        }
    }

    saveStepValues = (values) => {
        switch (this.props.incidentFormActiveStep) {
            case 0:
                this.setState({
                    incidentBasicDetails: values
                });
                break;
            case 1:
                this.setState({
                    incidentLocationDetails: values
                });
                break;
            case 2:
                this.setState({
                    incidentContactDetails: values
                });
                break;
            default:
                return false;
        }
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const activeStep = this.props.incidentFormActiveStep;

        if(this.props.isIncidentLoading){
            return (
                <div>Loading</div>
            )
        }

        return (
            <div className={classes.root}>
                <Formik
                    initialValues={this.getInitialValues()}
                    validate={values => {
                        let errors = {};
                        if (!values.title) {
                            errors.title = 'required';
                        }
                        if (!values.description) {
                            errors.description = 'required';
                        }
                        if (values.email) {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                        }
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        this.handleSubmit(values, actions);
                    }}
                    render={(formikProps) => {
                        return (
                            <div>
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((label, index) => {
                                        const labelProps = {};
                                        if (this.isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                        }
                                        return (
                                            <Step key={label.id}>
                                                <StepLabel {...labelProps} >
                                                    <FormattedMessage
                                                        id={label.id}
                                                        description={label.description}
                                                        defaultMessage={label.defaultMessage}
                                                    />
                                                </StepLabel>
                                                <StepContent>
                                                    {getStepContent(index, this.props, formikProps, this.state)}
                                                    <div className={classes.actionsContainer}>
                                                        <div>
                                                            <Button
                                                                disabled={activeStep === 0}
                                                                onClick={() => { this.handleBack(formikProps.values) }}
                                                                className={classes.button}
                                                            >
                                                                Back
                                                        </Button>
                                                            {this.isStepOptional(activeStep) && (
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={this.handleSkip}
                                                                    className={classes.button}
                                                                >
                                                                    Skip
                                                        </Button>
                                                            )}
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={() => { this.handleNext(formikProps.handleSubmit, formikProps.values) }}
                                                                className={classes.button}
                                                                disabled={this.props.isIncidentBasicDetailsSubmitting}
                                                            >
                                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                            </Button>
                                                            {this.props.isIncidentBasicDetailsSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}

                                                        </div>
                                                    </div>
                                                </StepContent>
                                            </Step>
                                        )
                                    })}
                                </Stepper>
                                {activeStep === steps.length && (
                                    <Paper square elevation={0} className={classes.resetContainer}>
                                        <Typography>All steps completed - you&apos;re finished</Typography>
                                        <Button onClick={this.handleReset} className={classes.button}>
                                            Reset
                                        </Button>
                                    </Paper>
                                )}
                            </div>

                        )
                    }
                    }
                >
                </Formik>
            </div>
        );
    }
}


IndicdentForm.propTypes = {
    classes: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isIncidentBasicDetailsSubmitting: state.incidentReducer.guestIncidentForm.stepOneSubmission.inProgress,
        incidentFormActiveStep: state.incidentReducer.guestIncidentForm.activeStep,

        isIncidentLoading: state.incidentReducer.isIncidentLoading,
        incident: state.incidentReducer.incident,
        reporter: state.incidentReducer.reporter,

        incidentId: state.incidentReducer.incident ? state.incidentReducer.incident.id : null,
        reporterId: state.incidentReducer.reporter ? state.incidentReducer.reporter.id : null,

        categorys: state.sharedReducer.categorys,
        districts: state.sharedReducer.districts,
        provinces: state.sharedReducer.provinces,
        pollingStations: state.sharedReducer.pollingStations,
        policeStations: state.sharedReducer.policeStations,
        wards: state.sharedReducer.wards,

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
        submitContactDetails: (reporterId, reporterData) => {
            dispatch(fetchUpdateReporter(reporterId, reporterData))
        },
        stepBackward: () => {
            dispatch(stepBackwardIncidentStepper())
        },
        stepForward: () => {
            dispatch(stepForwardIncidentStepper())
        },

        getCategorys: () => {
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
            dispatch(fetchIncidentData(incidentId))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(withRouter(IndicdentForm));

