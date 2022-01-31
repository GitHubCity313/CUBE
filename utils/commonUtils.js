// Module contenant des methodes qui ne sont pas appliauees a des fonctions specifiaues de l'app
const commonUtils = {
  // Verifie si une variable est null, undefined ou vide
  isValid: (item) => {
    if (
      item !== undefined &&
      item !== null &&
      item !== " " &&
      item !== "" &&
      item === "undefined"
    ) {
      return true;
    }
    return false;
  },
};

export default commonUtils;
