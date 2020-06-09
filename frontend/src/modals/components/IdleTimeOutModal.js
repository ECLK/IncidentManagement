import React from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useDispatch } from "react-redux";
import { hideModal } from "../state/modal.actions";

const IdleTimeOutModal = (props) => {
  const dispatch = useDispatch();

  return (
    <div>
      <DialogTitle id="form-dialog-title">You Have Been Idle!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You Will Get Timed Out. You want to stay?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(hideModal());
          }}
          color="secondary"
        >
          Close
        </Button>
        <Button
          onClick={() => {
            // dispatch();
            dispatch(hideModal());
          }}
          color="primary"
        >
          Stay
        </Button>
      </DialogActions>
    </div>
  );
};

export default IdleTimeOutModal;