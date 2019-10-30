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

import { Link, withRouter } from 'react-router-dom';

import { initiateSignOut, fetchChannels, fetchElections, fetchCategories, fetchProvinces, fetchDistricts, fetchDivisionalSecretariats, fetchGramaNiladharis, fetchPollingDivisions, fetchPollingStations, fetchPoliceStations, fetchPoliceDivisions, fetchWards } from '../../state/Shared.actions'
import { changeLanguage } from '../../state/Shared.actions';
import { loadUsers } from '../../../user/state/userActions'

import RootModal from '../../../modals/components/RootModal'
import Notification from '../../../notifications/components/Notification';

import Breadcrumbs from '../Breadcrumbs';
import { API_BASE_URL } from '../../../../config'

import { userCan, USER_ACTIONS } from '../../../utils/userUtils';

const HomeLink = props => <Link to="/app/home" {...props} />
const ReportLink = props => <Link to="/app/create" {...props} />
const ReviewLink = props => <Link to="/app/review" {...props} />
const StaticReportLink = props => <Link to="/app/reports" {...props} />
const ArchiveLink = props => <Link to="/app/archive" {...props} />

const ManageUsers = props => <Link to="/manage/users" {...props} />
const ManageOrgs = props => <Link to="/manage/organizations" {...props} />
const ManageDivisions = props => <Link to="/manage/divisions" {...props} />
const ManageLevels = props => <Link to="/manage/levels" {...props} />
const ManageRoles = props => <Link to="/manage/roles" {...props} />
const ManagePermissions = props => <Link to="/manage/permissions" {...props} />


const drawerWidth = 240;

const styles = theme => ({
    root: {
        // display: 'flex',
        flexGrow: 1
    },
    homeButton: {
        marginLeft: theme.spacing.unit * 4
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
        marginTop: theme.spacing.unit * 1
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
    breadCrumbWrapper: {
        marginBottom: theme.spacing.unit * 4
    }
});

class DomainContainer extends React.Component {
  state = {
    open: true,
    anchorEl: null,
    anchorLang: null,
    anchorManage: null
  };

  componentDidMount() {
    this.props.getChannels();
    this.props.getElections();
    this.props.getCategories();
    this.props.getProvinces();
    this.props.getDistricts();
    this.props.getDivisionalSecretariats();
    this.props.getGramaNiladharis();
    this.props.getPollingDivisions();
    this.props.getPollingStations();
    this.props.getPoliceStations();
    this.props.getPoliceDivisions();
    this.props.getWards();
    this.props.loadAllUsers();
  }

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


  handleManageMenu = event => {
      this.setState({ anchorManage: event.currentTarget });
  }
  handleManageMenuClose = () => {
      this.setState({ anchorManage: null });
  }

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

  handlePasswordChange = () => {
    window.open(API_BASE_URL+'/admin/password_change/', '_blank');
  }

  render() {
    const { classes, selectedLanguage, signedInUser, location } = this.props;
    const { open, anchorEl, anchorLang, anchorManage } = this.state;
    const menuOpen = Boolean(anchorEl);
    const langMenuOpen = Boolean(anchorLang);
    const manageMenuOpen = Boolean(anchorManage);

    const selectedMainSection = location.pathname.split('/')[2]

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="static"
        >
            <Toolbar disableGutters={!open}>

                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Incident Management
                    
                <Button variant={selectedMainSection==='users'?'outlined': 'flat'} 
                    color="inherit" component={ManageUsers} className={classes.homeButton}>Users</Button>

                <Button variant={selectedMainSection==='organizations'?'outlined': 'flat'} 
                    color="inherit" component={ManageOrgs}>Organizations</Button>
                

                <Button variant={selectedMainSection==='divisions'?'outlined': 'flat'} 
                    color="inherit" component={ManageDivisions}>Divisions</Button>
                

                {userCan(signedInUser, null, USER_ACTIONS.REVIEW_INCIDENTS) && (
                    <Button variant={selectedMainSection==='levels'?'outlined': 'flat'} 
                        color="inherit" component={ManageLevels}>Levels</Button>
                )}
                
                {userCan(signedInUser, null, USER_ACTIONS.VIEW_REPORTS) && (
                    <Button variant={selectedMainSection==='roles'?'outlined': 'flat'} 
                        color="inherit" component={ManageRoles}>Roles</Button>
                )}

                {userCan(signedInUser, null, USER_ACTIONS.REVIEW_INCIDENTS) && (
                    <Button variant={selectedMainSection==='permissions'?'outlined': 'flat'} 
                        color="inherit" component={ManagePermissions}>Permissions</Button>
                )}
                    
                </Typography>

                {/* language set */}
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
                    <MenuItem onClick={() => (this.handleLanguageChange('si'))}>Sinhala</MenuItem>
                    <MenuItem onClick={() => (this.handleLanguageChange('ta'))}>Tamil</MenuItem>
                    <MenuItem onClick={() => (this.handleLanguageChange('en'))}>English</MenuItem>
                </Menu>

                {/* manage users */}
                <Button
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleManageMenu}
                    color="inherit"
                    >
                Manage
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorManage}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={manageMenuOpen}
                    onClose={this.handleManageMenuClose}
                    >
                    <MenuItem component={HomeLink}>Incidents</MenuItem>
                    <MenuItem component={ManageUsers}>Users</MenuItem>
                </Menu>


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
                            <MenuItem onClick={this.handlePasswordChange}>Change Password</MenuItem>
                            <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem>
                        </Menu>

                        <Button
                            aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleMenu}
                        >
                            {signedInUser.displayname}
                            <AccountCircle style={{ margin: 5 }} />
                        </Button>
                    </Toolbar>
                </AppBar>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <RootModal />

                    <div className={classes.breadCrumbWrapper}><Breadcrumbs pathname={location.pathname} /></div>

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
        isSignedIn: state.sharedReducer.signedInUser.isSignedIn,
        selectedLanguage: state.sharedReducer.selectedLanguage,
        signedInUser: state.sharedReducer.signedInUser.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            dispatch(initiateSignOut())
        },
        changeLanguage: (lang) => {
            dispatch(changeLanguage(lang))
        },
        showError: (error) => {
            dispatch({
                type: "SHOW_NOTIFICATION",
                error: {
                    message: "Major error in data! Fallback"
                }
            })
        },

        getChannels: () => {
            dispatch(fetchChannels())
        },
        getElections: () => {
            dispatch(fetchElections());
        },
        getCategories: () => {
            dispatch(fetchCategories())
        },
        getProvinces: () => {
            dispatch(fetchProvinces())
        },
        getDistricts: () => {
            dispatch(fetchDistricts())
        },
        getDivisionalSecretariats: () => {
            dispatch(fetchDivisionalSecretariats())
        },
        getGramaNiladharis: () => {
            dispatch(fetchGramaNiladharis())
        },
        getPollingDivisions: () => {
            dispatch(fetchPollingDivisions())
        },
        getPollingStations: () => {
            dispatch(fetchPollingStations())
        },
        getPoliceStations: () => {
            dispatch(fetchPoliceStations())
        },
        getPoliceDivisions: () => {
            dispatch(fetchPoliceDivisions())
        },
        getWards: () => {
            dispatch(fetchWards())
        },
        loadAllUsers: () => {
            dispatch(loadUsers())
        }
    }
}

export default withRouter(compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps, mapDispatchToProps))
    (DomainContainer));
