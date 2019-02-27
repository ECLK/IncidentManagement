

// EditUserDialog.js
import React,  { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: 4*theme.spacing.unit,
      marginRight: 4*theme.spacing.unit,
      width: 500,
    },
    description: {
      marginLeft: 4*theme.spacing.unit,
      marginRight: 4*theme.spacing.unit,
      width: 1000,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });

const  MyImaginaryRestApiCall = async (usrid, val)=>{
    console.log('api call')
}

class IncidentForm extends Component{
    render(){
    const {user, onClose, updateUser, classes} = this.props;
    return (
        <Formik
          initialValues={user /** { email, social } */}
          onSubmit={(values, actions) => {
              console.log(values)
            MyImaginaryRestApiCall(user.id, values).then(
              updatedUser => {
                actions.setSubmitting(false);
                // updateUser(updatedUser);
                // onClose();
              },
              error => {
                actions.setSubmitting(false);
                // actions.setErrors(transformMyRestApiErrorsToAnObject(error));
                actions.setStatus({ msg: 'Set some arbitrary status or data' });
              }
            );
          }}
          render={({
            values,
            errors,
            status,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={classes.container}>
              <TextField
                type="text"
                name="incidentTitle"
                label="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                value=""
                className={classes.textField}
              />
              {errors.email && touched.email && <div>{errors.email}</div>}
              <TextField
                type="text"
                name="incidentDescription"
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                value=""
                className={classes.description}
              />
              {errors.social &&
                errors.social.facebook &&
                touched.facebook && <div>{errors.social.facebook}</div>}
      
              {status && status.msg && <div>{status.msg}</div>}
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        />
    );
  };
}
  export default withStyles(styles)(IncidentForm);
