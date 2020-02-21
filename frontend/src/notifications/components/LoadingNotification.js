import React from 'react';
import Notification from './Notification';
import { useSelector } from 'react-redux';

const ErrorNotification = (props) => {
    const isLoading = useSelector(state => state.notification.isLoading);

    return (
        <>
            {isLoading && (
                <Notification
                    notificationType="info"
                    message="Loading..."
                />
            )}
        </>
    )
}

export default ErrorNotification;