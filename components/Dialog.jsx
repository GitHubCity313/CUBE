import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function CustomDialog(props) {
  const {
    open,
    children,
    handleClose,
    handleConfirmation,
    title,
    hasNoConfirmation,
  } = props;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle sx={{ color: "gov.blue", p: 3 }}>{title}</DialogTitle>
      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          variant={hasNoConfirmation ? "bleuBtn" : "redBtn"}
          onClick={handleClose}
        >
          {hasNoConfirmation ? "Fermer" : "Annuler"}
        </Button>
        {!hasNoConfirmation && (
          <Button variant="bleuBtn" onClick={handleConfirmation}>
            Modifier
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.defaultProps = {
  hasNoConfirmation: false,
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  hasNoConfirmation: PropTypes.bool,
};
