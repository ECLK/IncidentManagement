import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Route from 'react-router/Route';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
});

const breadcrumbNameMap = {
    '/app': 'Home',
    '/app/create': 'Create',
    '/app/report': 'Report',  
    '/app/review-complaints': 'Review Complaints',
    '/app/review-inquiries' : 'Review Inquiries',
    '/app/review/incident': 'Incident',
    '/app/review/incident/edit': 'Edit',
    '/app/reports':'Reports',
    '/app/archive':'Archive'
};

function SimpleBreadcrumbs(props) {
    const { classes, pathname } = props;
    return (
        <div className={classes.root}>
            <Route>
              {({ location }) => {
                const pathnames = location.pathname.split('/').filter(x => x);


                return (
                  <Breadcrumbs arial-label="Breadcrumb">
                    {pathnames.map((value, index) => {
                      const last = index === pathnames.length - 1;
                      const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                        //TODO: quick hack to get this working. Improve later.
                        let virtualPathNames = pathnames.slice(0)
                        if(pathnames[1] ==='review-complaints' && pathnames.length>2){
                            virtualPathNames[2] = 'incident'
                        }
                        const virtualTo = `/${virtualPathNames.slice(0, index + 1).join('/')}`;
                    
                        
                      return last ? (
                        <Typography color="textPrimary" key={to}>
                          {breadcrumbNameMap[virtualTo]}
                        </Typography>
                      ) : (
                        <Link component={RouterLink} color="inherit" to={to} key={to}>
                          {breadcrumbNameMap[virtualTo]}
                        </Link>
                      );
                    })}
                  </Breadcrumbs>
                );
              }}
            </Route>
        </div>
    );
}

SimpleBreadcrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBreadcrumbs);
