
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

// date picker imports
import Grid from '@material-ui/core/Grid';

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
                    label={<div>Title*</div>}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.title}
                    className={classes.textField}

                    error={errors.title && touched.title}
                    helperText={(errors.title && touched.title) ? errors.title : null}
                />
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
                    required
                    error={errors.description && touched.description}
                    helperText={(errors.description && touched.description) ? errors.description : null}
                />

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.radioSelecLabel}>Current Status</FormLabel>
                    <RadioGroup
                        aria-label="Status"
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
                    <TextField
                        margin="normal"
                        id="date"
                        label="Date"
                        type="date"
                        value={values.date}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={handleChange}
                    />
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        value={values.time}
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                        onChange={handleChange}
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
                        <MenuItem value={1}>Parliamentary Election 2020 </MenuItem>
                        <MenuItem value={2}>Presedential Election 2021</MenuItem>
                        <MenuItem value={3}>Provincial Election 2020</MenuItem>
                    </Select>
                </FormControl>

                <div style={{ 'width': '100%' }}></div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                        value={values.category}
                        onChange={handleChange}
                        inputProps={{
                            name: 'category',
                            id: 'category',
                        }}
                    >
                        {this.props.categories.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.sub_category}</MenuItem>
                        ))}

                        <MenuItem value="Other"> Other </MenuItem>
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

export default IncidentBasicDetailsForm