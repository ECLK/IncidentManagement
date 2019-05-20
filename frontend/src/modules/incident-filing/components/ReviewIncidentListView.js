
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
import TextField from '@material-ui/core/TextField';



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
    textField: {
      width: 200,
    },
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
              initialValues={{ email: '' }}
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

                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    <input
                      id="email"
                      placeholder="Enter your email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}

                    <button
                      type="button"
                      className="outline"
                      onClick={handleReset}
                      disabled={!dirty || isSubmitting}
                    >
                      Reset
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
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
