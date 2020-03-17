import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';

import {withStyles} from '@material-ui/core/styles';
import {Table, TableHead, TableRow, TableCell, TableBody, Paper} from '@material-ui/core';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";
import yellow from "@material-ui/core/colors/yellow";
import TextField from "@material-ui/core/TextField/TextField";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import moment from 'moment'
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        marginBottom: 20,
    },
    textField: {
        width: '100%'
    },
    formControl: {
        width: '100%'
    },
    datetime: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    radioItem: {
        margin: 20,
    },
    checked: {},
    hide: {
        display: "none",
    },
    langCats: {
        display: "flex",
        "& div": {
            padding: "0 3px"
        }
    }
})

class ReportList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            report_type: "category_wise_summary_report",
            start_date: moment().subtract(1, 'd').format("YYYY-MM-DDT16:00"),
            end_date: moment().format("YYYY-MM-DDT15:59"),
            detailed_report: "false",
            complain: true,
            inquiry: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.report_type !== "" && (this.state.complain || this.state.inquiry)) {
            this.props.history.push(`/app/reports/view?report=` + this.state.report_type +
                "&start_date=" + this.state.start_date +
                "&end_date=" + this.state.end_date +
                "&detailed_report=" + this.state.detailed_report +
                "&complain=" + this.state.complain +
                "&inquiry=" + this.state.inquiry
            );
        }
    };

    handleChange(key, value) {
        this.setState({[key]: value})
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root} style={{padding: 20}}>
                <Grid container spacing={24}>
                    <Grid item md={3} sm={6} xs={12}>
                        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="category">Report Type*</InputLabel>
                                        <Select
                                            value={this.state.report_type}
                                            onChange={(e) => this.handleChange("report_type", e.target.value)}

                                        >
                                            <MenuItem value="category_wise_summary_report"> Category Wise </MenuItem>
                                            <MenuItem value="subcategory_wise_summary_report"> Subcategory
                                                Wise </MenuItem>
                                            {/*<MenuItem value="district_wise_summary_report"> District Wise </MenuItem>*/}
                                            <MenuItem value="mode_wise_summary_report"> Mode Wise </MenuItem>
                                            <MenuItem value="incident_date_wise_summary_report"> Incident Date
                                                Wise </MenuItem>
                                            <MenuItem value="severity_wise_summary_report"> Severity Level
                                                Wise </MenuItem>
                                            <MenuItem value="status_wise_summary_report"> Status Wise </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Incident Types</FormLabel>
                                        <Grid container spacing={24}>
                                            <Grid item xs={6}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="complain"
                                                            name="complain"
                                                            checked={this.state.complain}
                                                            onChange={(e) => this.handleChange("complain", e.target.checked)}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Complaints"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            id="inquiry"
                                                            name="inquiry"
                                                            checked={this.state.inquiry}
                                                            onChange={(e) => this.handleChange("inquiry", e.target.checked)}
                                                            color="primary"
                                                        />
                                                    }
                                                    label="Inquiries"
                                                />
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Report Format</FormLabel>
                                        <RadioGroup
                                            name="report_format"
                                            id="report_format"
                                            value={this.state.detailed_report}
                                            onChange={(e) => this.handleChange("detailed_report", e.target.value)}
                                            row
                                        >
                                            <FormControlLabel
                                                value="false"
                                                control={
                                                    <Radio/>
                                                }
                                                label="General"
                                                labelPlacement="bottom"
                                                className={classes.radioItem}

                                            />
                                            <FormControlLabel
                                                disabled={this.state.report_type === 'incident_date_wise_summary_report'}
                                                value="true"
                                                control={
                                                    <Radio/>
                                                }
                                                label="District wise"
                                                labelPlacement="bottom"
                                                className={classes.radioItem}

                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        id="start_date"
                                        label="Start Date"
                                        type="datetime-local"
                                        error={this.state.start_date === ""}
                                        helperText={this.state.start_date === "" ? 'Invalid Date!' : ' '}
                                        value={this.state.start_date}
                                        InputLabelProps={{shrink: true}}
                                        onChange={(e) => this.handleChange("start_date", e.target.value)}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        id="end_date"
                                        label="End Date"
                                        type="datetime-local"
                                        error={this.state.start_date === ""}
                                        helperText={this.state.start_date === "" ? 'Invalid Date!' : ' '}
                                        value={this.state.end_date}
                                        InputLabelProps={{shrink: true}}
                                        onChange={(e) => this.handleChange("end_date", e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary"
                                            className={classes.button}>Generate Report</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(ReportList));