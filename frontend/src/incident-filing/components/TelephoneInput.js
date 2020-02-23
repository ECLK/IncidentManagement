import React from 'react';
import NumberFormat from 'react-number-format';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: '100%'
    },
});

function NumberFormatCustom(props) {
    const { inputRef, onChange, name, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name:name
                    },
                });
            }}
            format="+94 (###) ###-####"
            mask="_"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

class TelephoneInput extends React.Component {

    render() {
        
        const { classes, name,
            label,
            placeholder,
            multiline } = this.props;

        return (
            <Field 
            name={name}>
            {({
              field, // { name, value, onChange, onBlur }
              form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              meta,
            }) => (
                <TextField
                    {...field}
                    label={label}
                    placeholder={placeholder}
                    error={form.touched[name] && form.errors[name]}
                    helperText={form.touched[name] ? form.errors[name] : null}
                    multiline={multiline}
                    className={classes.formControl}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                    name={name}
                />
            )}
          </Field>

            
        );
    }
}

TelephoneInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TelephoneInput);
