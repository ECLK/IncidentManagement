import {SHOW_NOTIFICATION} from './notifications.type'

export function showNotification(error,confirm){
    return {
        type:SHOW_NOTIFICATION,
        confirm:confirm,
        error:error
    }
}