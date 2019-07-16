import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'

import TestModalContent from './TestModalContent'
import  ResponseTimeEditModal from './ResponseTimeEditModal'
import { Modal } from '@material-ui/core';

import { hideModal } from '../state/modal.actions'

const MODAL_COMPONENTS = {
    'RESPOSE_TIME_EDIT': ResponseTimeEditModal,
    /* other modals */
}

const RootModal = (props) => {

    const {modalType, modalProps} = useSelector(state => state.modalReducer)
    const dispatch = useDispatch()

    if (!modalType) {
        return <span /> // after React v15 you can return null here
    }

    const ModalContent = MODAL_COMPONENTS[modalType]

    return (
        <div>
            <Dialog
                open={modalType?true:false}
                onClose={()=>{dispatch(hideModal())}}
                aria-labelledby="form-dialog-title"
            >
                <ModalContent {...modalProps}/>
            </Dialog>
        </div>
    );
}

export default RootModal;
