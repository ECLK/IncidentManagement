import React, { Component } from 'react';
import { AppBar } from '@material-ui/core';
import "./Domains.css";
import Link from 'react-router-dom/Link';
import LanguageSelector from '../LanguageSelector';
import Logo from '../Logo';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
  });



class DomainContainer extends Component {

    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render(){

        const { classes, theme } = this.props;
        
        const drawer = this.props.drawer;
        return(
            
            <div className={classes.root}>
                <CssBaseline />
                <AppBar>
                    <div className='header-bar'>
                        <div className='header-icon-container'>
                            
                        </div>
                        <div className='header-title-container'>
                            {this.props.header? this.props.header() : ''}
                        </div>
                        <div className='header-lang-select-container'>
                            <LanguageSelector />
                        </div>
                    </div>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    
                    <Hidden smUp implementation="css">
                        <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        >
                        {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                        >
                        <div className='logo-contain'>
                            <Link to='/'>
                                <Logo maxWidth={'100%'}/>
                            </Link>
                        </div>
                        {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.content ? this.props.content() : ''}
                    
                </main>
                
                
            </div>
        )
    }
}

// export default DomainContainer;
export default withStyles(styles, { withTheme: true })(DomainContainer);