import React from 'react';
import { Formik, FastField } from 'formik';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        width: '100%'
    },

})

function TextInputField(props){

    const {
        classes,
        name,
        label,
        placeholder,
        multiline
    } = props;

    return(
        <FastField
            name={name}
            placeholder={placeholder}
            render={({ field, form }) => (
                <TextField
                    {...field}  
                    type="text"
                    label={label}
                    placeholder={placeholder}
                    className={classes.textField}
                    error={ form.touched.title && form.errors.title}
                    helperText={form.touched.title ? form.errors.title : null}
                    multiline={multiline}
                />
            )}
          />
    )
}

export default withStyles(styles)(TextInputField)