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
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            name="reporterMobile"
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
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
            multiline,
            value,
            onChange
        } = this.props;

        return (
            <TextField
                label={label}
                placeholder={placeholder}
                // error={form.touched.title && form.errors.title}
                // helperText={form.touched.title ? form.errors.title : null}
                multiline={multiline}
                className={classes.formControl}
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
                placeholder="+94 (___) ___-____"
                onChange={onChange}
                value={value}
            />


        );
    }
}

TelephoneInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TelephoneInput);
