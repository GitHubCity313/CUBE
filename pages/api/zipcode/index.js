import clientPromise from "../../../lib/mongodb";

export default function ressources(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getRessources = async (db, res) => {
    try {
      const localities = await db
        .collection("zipcode")
        .find({})
        .limit(25)
        .toArray();
      return res.status(200).json({ localities });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();

    switch (req.method) {
      case "GET": {
        return await getRessources(db, res);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}

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
 *           example: trouver un truc
 *         resourceType:
 *           type: string
 *           description: Le type de la ressource.
 *           schema :
 *             oneOf: ["event", "association"]
 *             example: event
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
 *         contentId:
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

/**
 * @swagger
 * /resources:
 *   get:
 *     tags : [resources]
 *     description: Renvoie la liste des ressources.
 *     responses:
 *       200:
 *         description: L'ensemble des ressources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "fdkjsfjd"
 *   post:
 *     tags : [resources]
 *     description: Créé une nouvelle ressource.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: La ressource nouvellement crée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "fdkjsfjd"
 */
