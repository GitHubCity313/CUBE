import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Avatar } from "@mui/material";

const UploadFile = (props) => {
  const { profilePicture, handleChangeOnProfilePicture, alt } = props;
  // Pour telecharger un fichier (ou une image), on se sert d'un input cache aue l'on va suivre a l'aide d'une ref
  const hiddenFileInput = useRef(null);
  // Quand on cliaue sur l'icone, on ouvre l'explorateur de fichier
  const selectFile = () => hiddenFileInput.current.click();

  // Transforme l'url de l'image en base64
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  const uploadProfilePicture = async (event) => {
    // SelectedFile = le fichier sur lequel tu cliaues dans ton interface
    const selectedFile = event.target.files[0];
    // On instancie un objet image, puis on lui donne pour source l'url du fichier choisi
    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    try {
      const picturePromise = await getBase64FromUrl(`${img.src}`);
      handleChangeOnProfilePicture(picturePromise);
    } catch (err) {
      handleChangeOnProfilePicture("");
    }
  };

  return (
    <Stack onClick={selectFile} alignItems="center" justifyContent="center">
      <Avatar
        alt={alt}
        src={profilePicture !== "" && profilePicture}
        sx={{ width: 80, height: 80 }}
      />

      <Box sx={{ visibility: "hidden", width: 0, heigth: 0 }}>
        <input
          type="file"
          accept="image/jpeg, image/png"
          ref={hiddenFileInput}
          onChange={uploadProfilePicture}
        />
      </Box>
    </Stack>
  );
};

UploadFile.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  handleChangeOnProfilePicture: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

export default UploadFile;
