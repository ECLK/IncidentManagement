
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// date picker impoerts
import Grid from '@material-ui/core/Grid';
import { TimePicker, DatePicker } from 'material-ui-pickers';

export class IncidentBasicDetailsForm extends Component {
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
            setFieldValue
        } = this.props;

        values.date = values.date || null;
        values.time = values.time || null;

        return (
            <form onSubmit={handleSubmit} className={classes.container}>
                <TextField
                    type="text"
                    name="title"
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
                    name="description"
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
                        name="occurence"
                        className={classes.group}
                        value={values.occurence}
                        onChange={handleChange}
                        row
                    >
                        <FormControlLabel value="OCCURED" control={<Radio color="primary" />} label="Occured" labelPlacement="end" />
                        <FormControlLabel value="OCCURRING" control={<Radio color="primary" />} label="Occurring" labelPlacement="end" />
                        <FormControlLabel value="WILL_OCCUR" control={<Radio color="primary" />} label="Will Occur" labelPlacement="end" />
                    </RadioGroup>
                </FormControl>


                <Grid container className={classes.dataTimePickers} justify="space-between">
                    <DatePicker
                        margin="normal"
                        label="Date"
                        name='date'
                        id='date'
                        value={values.date}
                        onChange={e => setFieldValue('date', e)}
                    />
                    <TimePicker
                        margin="normal"
                        label="Time"
                        name='time'
                        value={values.time}
                        onChange={e => setFieldValue('time', e)}
                    />
                </Grid>
                <Divider variant="middle" />

                <div style={{ 'width': '100%' }}></div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="election_id">Election</InputLabel>
                    <Select
                        value={values.election_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'election_id',
                            id: 'election_id',
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

                <div style={{ 'width': '100%' }}></div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Catagory</InputLabel>
                    <Select
                        value={values.category}
                        onChange={handleChange}
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.categorys.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.sub_category}</MenuItem>
                        ))}
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