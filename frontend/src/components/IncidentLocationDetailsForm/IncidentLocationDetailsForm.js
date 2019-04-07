
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
                    name="location"
                    label="Name/Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.location}
                    className={classes.textField}
                />

                <TextField
                    type="text"
                    name="address"
                    label="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    value={values.address}
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
                        {this.props.provinces.map((c, k) => (
                            <MenuItem value={k} key={k}>{c}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="district_id">Distric</InputLabel>
                    <Select
                        value={values.district_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'district_id',
                            id: 'district_id',
                        }}
                    >
                        {this.props.districts.map((c, k) => (
                            values.province ? (c.province === this.props.provinces[values.province] ? <MenuItem value={c.id} key={k}>{c.name}</MenuItem>:null):<MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="polling_station_id">Polling division</InputLabel>
                    <Select
                        value={values.polling_station_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'polling_station_id',
                            id: 'polling_station_id',
                        }}
                    >
                        {this.props.pollingStations.map((c, k) => (
                            values.district_id ? ( c.district_id === values.district_id ? <MenuItem value={c.id} key={k}>{c.name}</MenuItem>:null) : <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ward_id">Ward</InputLabel>
                    <Select
                        value={values.ward_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'ward_id',
                            id: 'ward_id',
                        }}
                    >
                        {this.props.wards.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="police_station_id">Police station</InputLabel>
                    <Select
                        value={values.police_station_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'police_station_id',
                            id: 'police_station_id',
                        }}
                    >
                        {this.props.policeStations.map((c, k) => (
                            values.district_id ? ( c.district_id === values.district_id ? <MenuItem value={c.id} key={k}>{c.name}</MenuItem>:null) : <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                            // <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </form>
        );
    };
}