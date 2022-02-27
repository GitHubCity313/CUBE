import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

export default function UserEditDialog(props) {
  const { open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifier vos informations</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="redBtn" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="blueBtn" onClick={handleClose}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
