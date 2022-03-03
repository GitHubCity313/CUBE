import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import UploadProfilPicture from "../Profile/UploadProfilPicture";

export default function UserEditDialog(props) {
  const { open, handleClose, user, setUser, handleChangeOnUserInfos } = props;

  const handleChangeOnUser = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleChangeOnProfilePicture = (newImg) => {
    setUser({ ...user, profilePic: newImg });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" sx={{ p: 4 }}>
      <DialogTitle sx={{ color: "gov.blue" }}>Modifier mon profil</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <DialogContentText sx={{ mb: 4 }}>
          Mettez à jour vos informations
        </DialogContentText>
        <Stack direction="row" spacing={3} alignItems="center">
          <UploadProfilPicture
            profilePicture={user.profilePic}
            handleChangeOnProfilePicture={handleChangeOnProfilePicture}
            alt={user.firstName}
          />
          <Typography variant="caption" sx={{ fontSize: 10, ml: 2 }}>
            Cliquez sur l'icône pour ajouter/modifier votre photo de profil
          </Typography>
        </Stack>

        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Adresse mail"
          type="email"
          fullWidth
          value={user.email}
          variant="standard"
          onChange={handleChangeOnUser}
        />

        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Nom"
          type="email"
          fullWidth
          variant="standard"
          value={user.lastName}
          onChange={handleChangeOnUser}
        />
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="Prénom"
          type="email"
          fullWidth
          variant="standard"
          value={user.firstName}
          onChange={handleChangeOnUser}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="redBtn" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="bleuBtn" onClick={handleChangeOnUserInfos}>
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    profilePic: PropTypes.string.isRequired,
    seen: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasEvents: PropTypes.arrayOf(PropTypes.string).isRequired,
    hasEventsCreated: PropTypes.arrayOf(PropTypes.string).isRequired,
    likes: PropTypes.number.isRequired,
    role: PropTypes.string.isRequired,
    isValidated: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    confirmationCode: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  handleChangeOnUserInfos: PropTypes.func.isRequired,
};
