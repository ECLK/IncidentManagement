import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'react-router-dom';

import {initiateSignOut} from '../../state/Shared.actions'
import {changeLanguage} from '../../state/Shared.actions';

import RootModal from '../../../modals/components/RootModal'

const HomeLink = props => <Link to="/app/home" {...props} />
const ReportLink = props => <Link to="/app/report" {...props} />
const ReviewLink = props => <Link to="/app/review" {...props} />


const drawerWidth = 240;

const styles = theme => ({
  root: {
    // display: 'flex',
    flexGrow: 1
  },
  homeButton: {
    marginLeft: theme.spacing.unit*4
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 8,
    paddingRight: theme.spacing.unit * 8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginTop: theme.spacing.unit*4
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
});

class DomainContainer extends React.Component {
  state = {
    open: true,
    anchorEl: null,
    anchorLang: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLangMenu = event => {
    this.setState({ anchorLang: event.currentTarget });
  };

  handleLangMenuClose = () => {
    this.setState({ anchorLang: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut = () => {
      const {signOut} = this.props;
      signOut();
  }

  handleLanguageChange = (lang) => {
    const {changeLanguage} = this.props;
    changeLanguage(lang);
  }

  render() {
    const { classes, selectedLanguage } = this.props;
    const { open, anchorEl, anchorLang } = this.state;
    const menuOpen = Boolean(anchorEl);
    const langMenuOpen = Boolean(anchorLang);

    return (
      <div className={classes.root}>
        <CssBaseline />


        <AppBar
          position="static"

        >
          <Toolbar disableGutters={!open}>

            <Typography variant="h6" color="inherit" className={classes.grow}>
                Incident Management

                <Button color="inherit" component={HomeLink} className={classes.homeButton}>Home</Button>
                <Button color="inherit" component={ReportLink}>Create</Button>
                <Button color="inherit" component={ReviewLink}>Review</Button>

            </Typography>

            <Button
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleLangMenu}
                  color="inherit"
                >
            {selectedLanguage}
            </Button>
            <Menu
                  id="menu-appbar"
                  anchorEl={anchorLang}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={langMenuOpen}
                  onClose={this.handleLangMenuClose}
                >
                  <MenuItem onClick={()=>(this.handleLanguageChange('si'))}>Sinhala</MenuItem>
                  <MenuItem onClick={()=>(this.handleLanguageChange('ta'))}>Tamil</MenuItem>
                  <MenuItem onClick={()=>(this.handleLanguageChange('en'))}>English</MenuItem>
            </Menu>

            <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
            </IconButton>
            <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={menuOpen}
                  onClose={this.handleMenuClose}
                >
                  <MenuItem >Profile</MenuItem>
                  <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
            </Menu>

            
          </Toolbar>
        </AppBar>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <RootModal/>
          {this.props.content}
        </main>
      </div>
    );
  }
}

DomainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn:state.sharedReducer.signedInUser.isSignedIn,
        selectedLanguage: state.sharedReducer.selectedLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut:() => {
            dispatch(initiateSignOut())
        },
        changeLanguage: (lang) => {
            dispatch(changeLanguage(lang))
        }
    }
}

export default compose( 
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps))
    (DomainContainer);
