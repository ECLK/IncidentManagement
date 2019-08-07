import React from 'react';
import Notification from './Notification';
import { useSelector } from 'react-redux';

const ErrorNotification = (props) => {
    const errors = useSelector(state => state.notificationReducer.errors);
    
    let message = null;

    if(errors){
        if(errors.response && errors.response.data){
            if(errors.response.data.data){
                message = errors.response.data.data.message;
            }else{
                message = "Server error"
            }
        }else{
            message = errors.message;
        }
    }
    
    return (
        <>
            {errors && (
                <Notification
                    notificationType="error"
                    message={message}
                />
            )}
        </>
    )
}

export default ErrorNotification;