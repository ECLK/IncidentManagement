import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IdleTimer from "react-idle-timer";

import { useDispatch } from "react-redux";
import { hideModal } from "../state/modal.actions";
import { fetchSignInRefreshToken, initiateSignOut } from "../../shared/state/sharedActions"

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
            dispatch(initiateSignOut())
            dispatch(hideModal());
          }}
          color="secondary"
        >
          Sign Out
        </Button>
        <Button
          onClick={() => {
            dispatch(fetchSignInRefreshToken());
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