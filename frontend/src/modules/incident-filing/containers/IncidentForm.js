
// EditUserDialog.js
import { compose } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Formik, withFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import StepContent from '@material-ui/core/StepContent';
import CircularProgress from '@material-ui/core/CircularProgress';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// date picker impoerts
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import { submitIncidentBasicData, stepBackwardIncidentStepper } from '../state/IncidentFiling.actions'

class IncidentFormBasicDetails extends Component {
    render() {
        const { user, onClose, classes, bindBasicDataForm, submitBasicDetails } = this.props;
        const {
            status,
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className={classes.container}>
                <TextField
                    type="text"
                    name="incidentTitle"
                    label="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.title}
                    className={classes.textField}
                />
                {errors.incidentTitle && touched.incidentTitle && <div>{errors.incidentTitle}</div>}
                <TextField
                    type="text"
                    name="incidentDescription"
                    label="Description"
                    multiline
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.description}
                    className={classes.description}
                />
                {errors.incidentDescription &&
                    touched.incidentDescription && <div>{errors.incidentTitle}</div>}

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.radioSelecLabel}>Current Status</FormLabel>
                    <RadioGroup
                        aria-label="Current Status"
                        name="currStatus"
                        className={classes.group}
                        value={values.currStatus}
                        onChange={handleChange}
                        row
                    >
                        <FormControlLabel value="Occured" control={<Radio color="primary" />} label="Occured" labelPlacement="end" />
                        <FormControlLabel value="Occurring" control={<Radio color="primary" />} label="Occurring" labelPlacement="end" />
                        <FormControlLabel value="WillOccur" control={<Radio color="primary" />} label="Will Occur" labelPlacement="end" />
                    </RadioGroup>
                </FormControl>
                
              
                    <Grid container className={classes.dataTimePickers} justify="space-between">
                        <DatePicker
                            margin="normal"
                            label="Date"
                            name='date'
                            id='date'
                            value={values.date}
                            onChange={handleChange}
                        />
                        <TimePicker
                            margin="normal"
                            label="Time"
                            name='time'
                            value={values.time}
                            onChange={handleChange}
                        />
                    </Grid>
                <Divider variant="middle" />

                <div style={{'width':'100%'}}></div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="electionId">Election</InputLabel>
                    <Select
                        value={values.electionId}
                        onChange={handleChange}
                        inputProps={{
                            name: 'electionId',
                            id: 'electionId',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>General Election 2020 </MenuItem>
                        <MenuItem value={2}>Presedential Election 2020</MenuItem>
                        <MenuItem value={3}>Presedential Election 2008</MenuItem>
                    </Select>
                </FormControl>

                <div style={{'width':'100%'}}></div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Catagory</InputLabel>
                    <Select
                        value={values.electionId}
                        onChange={handleChange}
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Cat1</MenuItem>
                        <MenuItem value={2}>Cat2</MenuItem>
                        <MenuItem value={3}>Cat3</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    type="text"
                    name="otherCat"
                    label="If Other(Specify Here)"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.otherCat}
                    className={classes.otherCat}
                />


                {status && status.msg && <div>{status.msg}</div>}
            </form>

        );
    };
}

const IncidentAdvancedDetailsForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.incidentAdvancedDetails.incidentTitle}
                name="incidentTitle"
            />
            {errors.name && touched.name && <div id="feedback">{errors.name}</div>}
            <button type="submit">Submit</button>
        </form>
    );
};

const IncidentAdvancedDetailsSection = withFormik({
    mapPropsToValues: () => ({ incidentDescription: '', incidentTitle: '', incidentAdvancedDetails: '' }),
    // Custom sync validation
    validate: values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required';
        }

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'IncidentAdvancedDetailsSection',
})(IncidentAdvancedDetailsForm);





class IncidentFormContactDetails extends Component {
    render() {
        const { user, onClose, classes, } = this.props;

        // formikProps
        const {
            status,
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;

        return (
            <form onSubmit={handleSubmit} className={classes.container}>
                <TextField
                    type="text"
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.title}
                    className={classes.textField}
                />
                {errors.email && touched.email && <div>{errors.email}</div>}
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type">Type</InputLabel>
                    <Select
                        value={values.type}
                        onChange={handleChange}
                        inputProps={{
                            name: 'type',
                            id: 'type',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Individual</MenuItem>
                        <MenuItem value={20}>Entity</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="text"
                    name="address"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.description}
                    className={classes.description}
                />
                {errors.social &&
                    errors.social.facebook &&
                    touched.facebook && <div>{errors.social.facebook}</div>}
                <TextField
                    type="tel"
                    name="telephone"
                    label="Telephone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.description}
                    className={classes.description}
                />
                {errors.telephone &&
                    touched.telephone && <div>{errors.telephone}</div>}
                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.description}
                    className={classes.description}
                />
                {errors.email &&
                    touched.email && <div>{errors.email}</div>}

                {status && status.msg && <div>{status.msg}</div>}
            </form>
        );
    };
}


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
        marginBottom: 4*theme.spacing.unit,
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
        marginLeft: theme.spacing.unit * 3 ,
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
        marginTop: 4*theme.spacing.unit,
        marginLeft:4*theme.spacing.unit
    }
});

function getSteps() {
    return ['Submit Incident Details', 'Submit Contact Details', 'Add additoinal details'];
}

function getStepContent(step, props, formikProps) {
    switch (step) {
        case 0:
            return (<IncidentFormBasicDetails {...props} {...formikProps} />);
        case 1:
            return (<IncidentFormContactDetails {...props} {...formikProps} />);
        case 2:
            return (<IncidentAdvancedDetailsSection {...props} {...formikProps} />);
        default:
            return 'Unknown step';
    }
}

class IndicdentForm extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        incidentBasicDetails: {
            incidentTitle: null,
            incidentDescription: null
        },
        incidentContactDetails: {
            name: null,
            email: null,
            address: null,
            telephone: null
        },
        incidentAdvancedDetails: {
            incidentType: null,
            incidentLocation: null
        }
    };

    isStepOptional = step => step === 1 || step === 2;

    handleNext = (onSubmit) => {
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

    handleBack = () => {
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
        this.props.submitIncidentBasicDetails(values);
        // switch (this.propsincidentFormActiveStep) {
        //     case 1:
        //         this.props.submitIncidentBasicDetails(values);
        //     default:
        //         return false;


        // }

    }


    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const activeStep = this.props.incidentFormActiveStep;
        console.log('isSubmitting ',this.props.isIncidentBasicDetailsSubmitting)

        return (
            <div className={classes.root}>
                <Formik
                    initialValues={{
                        date:new Date('2014-08-18T21:11:54'),
                        time:new Date('2014-08-18T21:11:54'),
                    }}
                    onSubmit={(values, actions) => {
                        console.log('formik.onsubmit', values)
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
                                            <Step key={label}>
                                                <StepLabel {...labelProps} >{label}</StepLabel>
                                                <StepContent>
                                                    <Typography>{getStepContent(index, this.props, formikProps)}</Typography>
                                                    <div className={classes.actionsContainer}>
                                                        <div>
                                                            <Button
                                                                disabled={activeStep === 0}
                                                                onClick={this.handleBack}
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
                                                                onClick={() => { this.handleNext(formikProps.handleSubmit) }}
                                                                className={classes.button}
                                                                disabled={this.props.isIncidentBasicDetailsSubmitting}
                                                            >
                                                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                            </Button>
                                                            {this.props.isIncidentBasicDetailsSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                            {/* <div className={classes.wrapper}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.button}
                                                                    disabled={this.props.isIncidentBasicDetailsSubmitting}
                                                                    onClick={() => { this.handleNext(formikProps.handleSubmit) }}
                                                                >
                                                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                                </Button>
                                                                {this.props.isIncidentBasicDetailsSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                            </div> */}
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

                                {/* Commented below is the code for horizontal stepper */}

                                {/* <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const props = {};
                                        const labelProps = {};
                                        if (this.isStepOptional(index)) {
                                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                        }
                                        if (this.isStepSkipped(index)) {
                                            props.completed = false;
                                        }
                                        return (
                                            <Step key={label} {...props}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Button onClick={this.handleReset} className={classes.button}>
                                                Reset
                                            </Button>
                                        </div>
                                    ) : (
                                            <div>
                                                <Typography className={classes.instructions}>
                                                    {getStepContent(activeStep, this.props, formikProps)}
                                                </Typography>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
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
                                                        onClick={()=>{this.handleNext(formikProps.handleSubmit)}}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                </div> */}
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
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitIncidentBasicDetails: (values) => {
            dispatch(submitIncidentBasicData(values))
        },
        stepBackward: () => {
            dispatch(stepBackwardIncidentStepper())
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(IndicdentForm);

