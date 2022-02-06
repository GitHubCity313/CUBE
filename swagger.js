const config = {
  openapi: "3.0.0",
  info: {
    title: "Ressources relationnelles",
    version: "1.0.0",
    description: "Documentation de l'API utilisée pour la gestion du site",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Serveur de developement",
    },
    {
      url: "#",
      description: "Recette",
    },
    {
      url: "##",
      description: "Production",
    },
  ],
  tags: [
    {
      name: "resources",
      description: " Gestion des publications sur l'application",
    },
    {
      name: "categories",
      description: " Accès aux differentes catégories de ressources",
    },
    {
      name: "users",
      description: "Gestion des ressources utilisateurs de la plateforme",
    },
  ],
};

export default config;
