/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: l'id de l'utilisateur.
 *           example: 61e165463d88f191f3f4e0d4
 *         lastName:
 *           type: string
 *           description: Le nom de l'utilisateur.
 *           example: Levasseur
 *         firstName:
 *           type: string
 *           description: Le prénom de l'utilisateur.
 *           example: Alain
 *         email:
 *           type: string
 *           description: L'adresse mail utilisée pour l'inscription.
 *           example: alain.levasseur@dayrep.com
 *         password:
 *           type: string
 *           description: Le hash du mot de passe.
 *           example: 8745de6abbc5a0b632fccdae08e53b3f
 *         isReported:
 *           type: boolean
 *           description: L'utilisateur a été signalé comme problématiaue.
 *           example: true
 *         profilePic:
 *           type: string
 *           description: Le hash du mot de passe.
 *           example: https://media.giphy.com/media/HoM16cP7vaYU/giphy.gif
 *         seen:
 *           type: array
 *           description: Je sais pas ce que c'est.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         hasEvents:
 *           type: array
 *           description: Les evenements auxquels l'utilisateur participe.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         hasEventsCreated:
 *           type: array
 *           description: Les evenements crées par l'utilisateur.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         likes:
 *           type: array
 *           description: Les ressources favorites de l'utilisateur.
 *           example: ["61e165463d88f191f3f4e0d4"]
 *         role:
 *           type: string
 *           description: Le rôle de l'utilisateur.
 *           example: 8745de6abbc5a0b632fccdae08e53b3f
 *         validationStatus:
 *           type: boolean
 *           description: Le compte de l'utilisateur a été confirmé.
 *           example: true
 *         createdAt:
 *           type: date
 *           description: La date de création de la ressource.
 *           example: 1630792800
 *         updatedAt:
 *           type: date
 *           description: La date de mise à jour de la ressource.
 *           example: 1630792800
 *         confirmationCode:
 *           type: string
 *           description: le code de confirmation a l'inscription
 *           example: 61e165463d88f191f3f4e0d4
 */
