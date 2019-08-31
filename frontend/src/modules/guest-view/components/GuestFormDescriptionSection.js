import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
});


const  IncidentDescription = (props) =>  {

        const { 
            classes,
            handledDescriptionChange,
            handleElectionChange,
            description,
            elections,
            selectedElection
         } = props;

        return (
            <form className={classes.container} noValidate autoComplete="off">

                <Grid container>
                
                <Grid item xs={12}>
                <TextField
                    autoFocus
                    id="incidentDescription"
                    label="Description"
                    multiline
                    fullWidth
                    rowsMax="4"
                    value={description}
                    onChange={(e)=>{handledDescriptionChange(e.target.value)}}
                    className={classes.textField}
                    margin="normal"
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    id="election"
                    select
                    label="Election"
                    className={classes.textField}
                    value={selectedElection}
                    onChange={(e)=>{handleElectionChange(e.target.value)}}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Select the relevant election"
                    margin="normal"
                >
                    {elections.map(option => (
                        <MenuItem key={option.value} value={option.code}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                </Grid>

                </Grid>

            </form>
        );
}

IncidentDescription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncidentDescription);
