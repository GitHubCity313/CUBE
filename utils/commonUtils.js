// Module contenant des methodes qui ne sont pas appliauees a des fonctions specifiaues de l'app
const commonUtils = {
  // Verifie si une variable est une string d'au moins 20 caracteres
  isValid: (item) => {
    if (typeof item === "string" && item.length > 20) {
      return true;
    }
    return false;
  },
};

export default commonUtils;
