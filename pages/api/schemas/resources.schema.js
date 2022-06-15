/**
 * @swagger
 * components:
 *   schemas:
 *     Resource:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: l'id de la ressource.
 *           example: 61e165463d88f191f3f4e0d4
 *         resourceType:
 *           type: string
 *           description: Le type de la ressource.
 *           schema :
 *             oneOf: ["event", "association"]
 *             example: "event"
 *         categories:
 *           type: array
 *           description: Les categories de la ressource.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         author:
 *           type: int
 *           description: L'id de l'auteur de la ressource.
 *           example: 61e165463d88f191f3f4e0d4
 *         hasParticipants:
 *           type: array
 *           description: Les utilisateurs inscrits pour l'evenement.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         isReported:
 *           type: boolean
 *           description: La ressource a été signalée comme problématiaue.
 *           example: true
 *         publicationStatus:
 *           type: string
 *           description: Le statut de la ressource.
 *           schema :
 *             oneOf: ["public", "private"]
 *             example: public
 *         title:
 *           type: string
 *           description: Le titre de la ressource
 *           example: Distribution de fournitures scolaires pour la rentrée
 *         content:
 *           type: array
 *           description: Le contenu de la ressource.
 *           example: [{insert: "Bonjour"}, {insert: "Ressources relationnelles"}]
 *         likes:
 *           type: int
 *           description: Le nombre de likes attachés à la publication.
 *           example: 12
 *         createdAt:
 *           type: date
 *           description: La date de création de la ressource.
 *           example: 1630792800
 *         updatedAt:
 *           type: date
 *           description: La date de mise à jour de la ressource.
 *           example: 1630792800
 *         startDate:
 *           type: date
 *           description: La date de début de l'evenement.
 *           example: 1630792800
 *         endDate:
 *           type: date
 *           description: La date de fin de l'evenement.
 *           example: 1630792800
 *         place:
 *           type: object
 *           description: La localisation de la ressource.
 *           example: {"city": "Lille","zipCode": "59000","region": "Hauts-de-France"}
 *         isModerated:
 *           type: boolean
 *           description: La ressource a été modérée.
 *           example: true
 */