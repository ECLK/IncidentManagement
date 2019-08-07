import produce from "immer";
import { RESET_ERROR, SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './notifications.type';

const initState = {
    isOpen: false,
    errors: null,
    confirms: null
};

export function notificationReducer(state = initState, action) {
    return produce(state, draft => {
        const { type, error } = action;

        if (type === SHOW_NOTIFICATION){
            draft.isOpen = true;
            return draft;
        }else if(type === HIDE_NOTIFICATION){
            draft.isOpen = false;
            draft.errors = null;
            draft.body = null;
            return draft;
        }else if(type === RESET_ERROR){
            draft.errors = null;
            return draft;
        }else if(error){
            draft.isOpen = true;
            draft.errors = error;
            return draft;
        }else{
            return state;
        }
    });
}