
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class IncidentLocationDetailsForm extends Component {
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
                    label="Location Name/Description"
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
                        {console.log(this.props.provinces)}
                        {this.props.provinces.map((c, k) => (
                            <MenuItem value={k} key={k}>{c}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="district">District</InputLabel>
                    <Select
                        value={values.district}
                        onChange={handleChange}
                        inputProps={{
                            name: 'district',
                            id: 'district',
                        }}
                    >
                        {this.props.districts.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl_ds}>
                    <InputLabel htmlFor="divisionalSecretariat">District Secretariat (DS) Division</InputLabel>
                    <Select
                        value={values.divisionalSecretariat}
                        onChange={handleChange}
                        inputProps={{
                            name: 'divisionalSecretariat',
                            id: 'divisionalSecretariat',
                        }}
                    >
                        {this.props.divisionalSecretariats.map((c, k) => (
                            <MenuItem value={k} key={k}>{c}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="police_station">Police station</InputLabel>
                    <Select
                        value={values.police_station}
                        onChange={handleChange}
                        inputProps={{
                            name: 'police_station',
                            id: 'police_station',
                        }}
                    >
                        {this.props.policeStations.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <div style={{ 'width': '100%' }}></div>

                <FormControl className={classes.formControl_pol}>
                    <InputLabel htmlFor="polling_division_id">Polling division</InputLabel>
                    <Select
                        value={values.polling_division_id}
                        onChange={handleChange}
                        inputProps={{
                            name: 'polling_division_id',
                            id: 'polling_division_id',
                        }}
                    >   
                        <MenuItem value="sample1" key="sample1">Sample PD1</MenuItem>
                        <MenuItem value="sample2" key="sample2">Sample PD2</MenuItem>
                        <MenuItem value="sample3" key="sample3">Sample PD3</MenuItem>
                        {/* {this.props.pollingStations.map((c, k) => (
                            values.district_id ? ( c.district_id === values.district_id ? <MenuItem value={c.id} key={k}>{c.name}</MenuItem>:null) : <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))} */}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl_pol}>
                    <InputLabel htmlFor="polling_station">Polling station</InputLabel>
                    <Select
                        value={values.polling_station}
                        onChange={handleChange}
                        inputProps={{
                            name: 'polling_station',
                            id: 'polling_station',
                        }}
                    >
                        {this.props.pollingStations.map((c, k) => (
                            <MenuItem value={c.id} key={k}>{c.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl_pol}>
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
                
                <div style={{ 'width': '100%' }}></div>

            </form>
        );
    };
}

export default IncidentLocationDetailsForm;