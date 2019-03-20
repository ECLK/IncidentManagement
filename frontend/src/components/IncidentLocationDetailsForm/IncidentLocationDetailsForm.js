
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export class IncidentLocationDetailsForm extends Component {
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
                    label="Name/Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.locationName}
                    className={classes.textField}
                />

                <TextField
                    type="text"
                    name="address"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.title}
                    className={classes.textField}
                />

                <div style={{'width':'100%'}}></div>
                
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="province">Province</InputLabel>
                    <Select
                        value={values.province}
                        onChange={handleChange}
                        inputProps={{
                            name: 'province',
                            id: 'province',
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

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="district">Distric</InputLabel>
                    <Select
                        value={values.district}
                        onChange={handleChange}
                        inputProps={{
                            name: 'district',
                            id: 'district',
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Colombo </MenuItem>
                        <MenuItem value={2}>Gampaha</MenuItem>
                        <MenuItem value={3}>Kalutara</MenuItem>
                        <MenuItem value={3}>Galle</MenuItem>
                        <MenuItem value={3}>Matara</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="polling_division">Polling division</InputLabel>
                    <Select
                        value={values.polling_division}
                        onChange={handleChange}
                        inputProps={{
                            name: 'polling_division',
                            id: 'polling_division',
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

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ward">Ward</InputLabel>
                    <Select
                        value={values.ward}
                        onChange={handleChange}
                        inputProps={{
                            name: 'ward',
                            id: 'ward',
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

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="police_station">Police station</InputLabel>
                    <Select
                        value={values.polling_station}
                        onChange={handleChange}
                        inputProps={{
                            name: 'police_station',
                            id: 'police_station',
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

            </form>
        );
    };
}