import produce from "immer";
import { RESET_ERROR, SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './notifications.type';

const initState = {
    isOpen: false,
    errors: null,
    confirms: null,
    isLoading: false
};

export function notificationReducer(state = initState, action) {
    return produce(state, draft => {
        const { type, error, isLoading, confirm } = action;

        if (type === SHOW_NOTIFICATION){
            draft.isOpen = true;
            draft.isLoading = false;
            draft.confirms = confirm;
            draft.errors = error;
            return draft;
        }else if(type === HIDE_NOTIFICATION){
            draft.isOpen = false;
            draft.errors = null;
            draft.confirms = null;
            draft.isLoading = false;
            draft.body = null;

            return draft;
        }else if(type === RESET_ERROR){
            draft.errors = null;
            return draft;
        }else if(error){
            draft.isOpen = true;
            draft.errors = error;
            draft.isLoading = false;

            return draft;
        }else if(confirm){
            draft.confirms = confirm;
            draft.isOpen = true;
            draft.isLoading = false;

            return draft;
        }else if(isLoading !== undefined && isLoading !== null){
            if(!draft.errors && !draft.confirms){
                if(isLoading === true){
                    draft.isLoading = true;
                    draft.isOpen = true;
                }else{
                    draft.isOpen = false;
                }
            }            
        }else{
            return state;
        }
    });
}