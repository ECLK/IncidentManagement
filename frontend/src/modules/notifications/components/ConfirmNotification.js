import React from 'react';
import Notification from './Notification';
import { useSelector } from 'react-redux';

const ConfirmNotification = (props) => {
    const confirms = useSelector(state => state.notification.confirms);
    return (
        <>
            {confirms && (
                <Notification
                    notificationType="success"
                    message={confirms.message}
                />
            )}
        </>
    )
}

export default ConfirmNotification;