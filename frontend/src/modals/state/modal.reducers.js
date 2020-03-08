import produce from "immer";

import { SHOW_MODAL, HIDE_MODAL } from './modal.types';

/**
 * Register new modals in the RootModal
 */

const initialState = {
    modalType: null,
    modalProps: {}
}

export default function modalReducer(state = initialState, action) {

    if (typeof state === "undefined") {
        return initialState;
    }
    return produce(state, draft => {
        switch (action.type) {
            case SHOW_MODAL:
                draft.modalType = action.modalType
                draft.modalProps = action.modalProps;
                return draft;
            case HIDE_MODAL:
                draft = initialState;
                return draft;
            default:
                return state
        }
    });
}