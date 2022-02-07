/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: l'id du commentaire.
 *           example: trouver un truc
 *         relatedResource:
 *           type: uuid
 *           description: La ressource associée au commentaire.
 *           example: uuid wanted
 *         author:
 *           type: int
 *           description: L'id de l'auteur de la ressource.
 *           example: uuid wanted
 *         title:
 *           type: string
 *           description: Le titre de la ressource.
 *           example: uuid wanted
 *         value:
 *           type: string
 *           description: Le contenu du commentaire.
 *           example: uuid wanted
 *         createdAt:
 *           type: date
 *           description: La date de création de la ressource.
 *           example: 1630792800
 *         updatedAt:
 *           type: date
 *           description: La date de mise à jour de la ressource.
 *           example: 1630792800
 *         isReported:
 *           type: boolean
 *           description: La ressource a été reportee comme problematique par un utilisateur.
 *           example: true
 *         isModerated:
 *           type: boolean
 *           description: La ressource a été moderée par un administrateur.
 *           example: true
 */
