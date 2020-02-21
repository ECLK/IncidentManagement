import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, IconButton, SnackbarContent, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CloseIcon from '@material-ui/icons/Close';
import { HIDE_NOTIFICATION } from '../state/notifications.type';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const Notification = ({ classes, notificationType, message }) => {
    const open = useSelector(state => state.notification.isOpen);
    const dispatch = useDispatch();

    function handleClose() {
        dispatch({ type: HIDE_NOTIFICATION });
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            action={[
                <CloseIcon className={classes.icon} />
            ]}
        >
            <SnackbarContent
                className={classes[notificationType]}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classes.icon} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

export default withStyles(styles, { withTheme: true })(Notification);
