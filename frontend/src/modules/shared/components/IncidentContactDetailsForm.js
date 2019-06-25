
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export class IncidentContactDetailsForm extends Component {
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
                    name="reporter_name"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.reporter_name}
                    className={classes.textField}
                />
                {errors.email && touched.email && <div>{errors.email}</div>}

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="reporter_type">Type</InputLabel>
                    <Select
                        value={values.reporter_type}
                        onChange={handleChange}
                        inputProps={{
                            name: 'reporter_type',
                            id: 'reporter_type',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Individual'}>Individual</MenuItem>
                        <MenuItem value={'Entity'}>Entity</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    type="text"
                    name="reporter_address"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.reporter_address}
                    className={classes.description}
                />
                {errors.social &&
                    errors.social.facebook &&
                    touched.facebook && <div>{errors.social.facebook}</div>}

                <TextField
                    type="tel"
                    name="reporter_telephone"
                    label="Telephone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.reporter_telephone}
                    className={classes.description}
                />
                {errors.reporter_telephone &&
                    touched.reporter_telephone && <div>{errors.reporter_telephone}</div>}

                <TextField
                    type="email"
                    name="reporter_email"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.reporter_email}
                    className={classes.description}
                />
                {errors.reporter_email &&
                    touched.reporter_email && <div>{errors.reporter_email}</div>}

                {status && status.msg && <div>{status.msg}</div>}
            </form>
        );
    };
}

export default IncidentContactDetailsForm;
