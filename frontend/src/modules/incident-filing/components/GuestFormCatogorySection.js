import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2
  },
  paper: {
    height: 140,
    width: 100,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  paperSelected: {
    height: 140,
    width: 100,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    border:'thick double #32a1ce'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const CatogorySection = (props) => {


    const { 
        classes, 
        categories, 
        selectedCategory, 
        setSelectedCategory } = props;

    let fullCategories = [{sub_category:'Other', id:"Other"}].concat(categories)

    return (
      <Grid container className={classes.root} spacing={16}>

        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="left" spacing={16}>
            {fullCategories.map(value => (
              <Grid key={value} item>
                <Paper 
                    className={ selectedCategory===value.id? classes.paperSelected : classes.paper} 
                    onClick={()=>{setSelectedCategory(value.id)}}>
                    <h3>{value.sub_category}</h3>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );

}

CatogorySection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CatogorySection);
