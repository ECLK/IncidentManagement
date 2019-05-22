
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Formik, withFormik } from 'formik';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


  const CustomTableCell = withRouter(withStyles(theme => ({ 
      body: {
          fontSize: 14,
      },
  }))(TableCell));
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
      cursor: 'pointer',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit*2,
      minWidth: 300,
    },
    buttonContainer:{
      margin: theme.spacing.unit*2,
      minWidth: 300,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 1,
    },
    datePicker:{

    }
  });
  
  let id = 0;
  function createData(title, description, status, category, location) {
    id += 1;
    return { id, title, description, status, category, location };
  }
  
  const rows = [
    createData('Posters being put up', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
    createData('Thugs set fire to shop', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
    createData('Threatned by a thug', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
    createData('Stolen ballot box', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
    createData('Fire at ballot station', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
    createData('Shooting at ballot station', " decription decription decription decription ", "New", 'Violation', 'Gampaha'),
  ];
  

function ReviewListView(props){
    const { classes } = props;

    return(
        <Paper className={classes.root}>
            <Formik
              initialValues={{ 
                  status: '', 
                  responseTime: '' , 
                  severity: '',
                  startDate: '',
                  endDate : ''
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                } = props;
                return (
                  <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="status-label-placeholder">
                        Status
                      </InputLabel>
                      <Select
                        input={<Input name="status" id="status-label-placeholder" />}
                        displayEmpty
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                         <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'new'}>New</MenuItem>
                        <MenuItem value={'req_more_info'}>Request More Info</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="response-time-label-placeholder">
                        Reponse time
                      </InputLabel>
                      <Select
                        input={<Input name="responseTime" id="response-time-label-placeholder" />}
                        displayEmpty
                        name="responseTime"
                        value={values.responseTime}
                        onChange={handleChange}        
                        className={classes.selectEmpty}
                      >
                         <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'1'}>1hr</MenuItem>
                        <MenuItem value={'2'}>2hr</MenuItem>
                        <MenuItem value={'3'}>3hr</MenuItem>
                        <MenuItem value={'4'}>4hr</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="status-label-placeholder">
                        Severity
                      </InputLabel>
                      <Select
                        input={<Input name="severity" id="severity-label-placeholder" />}
                        displayEmpty
                        name="severity"
                        value={values.severity}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                      >
                         <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'insignificant'}>Insignificant</MenuItem>
                        <MenuItem value={'minor'}>Minor</MenuItem>
                        <MenuItem value={'moderate'}>Moderate</MenuItem>
                        <MenuItem value={'major'}>Major</MenuItem>
                        <MenuItem value={'critical'}>Critical</MenuItem>

                      </Select>
                    </FormControl>  
          
                    <FormControl className={classes.formControl}>     
                                     
                      <TextField
                        displayEmpty
                        type="date"
                        name="startDate"
                        label="Start Date"
                        className={classes.datePicker}
                        value={values.startDate}
                        onChange={handleChange}
                        variant="outlined"  
                      />
                    </FormControl>
                    <FormControl className={classes.formControl}>                      
                      <TextField
                        displayEmpty
                        type="date"
                        name="endDate"
                        label="End Date"
                        className={classes.datePicker}
                        value={values.endDate}
                        onChange={handleChange}
                        variant="outlined"  
                      />
                    </FormControl>  
                    
                    <FormControl className={classes.buttonContainer}>                      
                      <Button onClick={handleReset} variant="contained" size="large" color="primary" >
                      Reset
                      </Button>
                      <Button type="submit" variant="contained" size="large" color="primary" >
                        Submit
                      </Button>
                    </FormControl>

                  </form>
                );
              }}
            </Formik>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell>Title</CustomTableCell>
                        <CustomTableCell>Description</CustomTableCell>
                        <CustomTableCell align="right">Status</CustomTableCell>
                        <CustomTableCell align="right">Category</CustomTableCell>
                        <CustomTableCell align="right">Location</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <TableRow onClick={()=>{props.history.push('/report/reviews/'+row.id) }}hover className={classes.row} key={row.id}>
                    <CustomTableCell scope="row">
                        {row.title}
                    </CustomTableCell>
                    <CustomTableCell >{row.description}</CustomTableCell>
                    <CustomTableCell align="right">{row.status}</CustomTableCell>
                    <CustomTableCell align="right">{row.category}</CustomTableCell>
                    <CustomTableCell align="right">{row.location}</CustomTableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(ReviewListView);
