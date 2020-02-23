import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
    flexWrap:'wrap'
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
  categoryText: {
    textAlign:'center'
  }
});

const CatogorySection = (props) => {


    const { 
        classes, 
        categories, 
        selectedCategory, 
        setSelectedCategory } = props;

    let fullCategories = categories || [];

    return (
      <Grid container className={classes.root} spacing={16}>

        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="left" spacing={16}>
            {fullCategories.map(value => (
              <Grid key={value} item>
                <Paper 
                    className={ selectedCategory===value.id? classes.paperSelected : classes.paper} 
                    onClick={()=>{setSelectedCategory(value.id)}}>
                    <h5 className={classes.categoryText}>{value.sub_category}</h5>
                    {/* <h5 className={classes.categoryText}>{value.sn_sub_category}</h5> */}
                    {/* <h5 className={classes.categoryText}>{value.tm_sub_category}</h5> */}
                    
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
