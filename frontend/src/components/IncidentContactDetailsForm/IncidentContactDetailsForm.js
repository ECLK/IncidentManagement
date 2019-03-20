
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
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.name}
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
                    value={values.address}
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
                    value={values.telephone}
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
                    value={values.email}
                    className={classes.description}
                />
                {errors.email &&
                    touched.email && <div>{errors.email}</div>}

                {status && status.msg && <div>{status.msg}</div>}
            </form>
        );
    };
}
