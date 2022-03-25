import clientPromise from "../../../lib/mongodb";

export default function categories(req, res) {
  // connexion a la db
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getCategories = async (db, res) => {
    try {
      const categories = await db.collection("categories").find({}).toArray();
      return res.status(200).json({ categories });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addCategory = async (db, res, category) => {
    try {
      const newCategory = await db.collection("categories").insertOne(category);
      return res.status(201).json({ newCategory });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();

    switch (req.method) {
      case "GET": {
        return await getCategories(db, res);
      }
      case "POST": {
        const category = req.body;
        return await addCategory(db, res, category);
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
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: l'id de la categorie.
 *           example: 61e165463d88f191f3f4e0d4
 *         name:
 *           type: string
 *           description: Le nom de la categorie.
 *           example: national
 *         color:
 *           type: string
 *           description: La couleur associee a la categorie.
 *           example: "#fff000"
 *         createdAt:
 *           type: date
 *           description: La date de création de la ressource.
 *           example: 1630792800
 *         updatedAt:
 *           type: date
 *           description: La date de mise à jour de la ressource.
 *           example: 1630792800
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     tags : [categories]
 *     description: Retrouve une categorie selon l'id demande.
 *     responses:
 *       200:
 *         description: L'ensemble des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "No category found"
 *   post:
 *     tags : [categories]
 *     description: Créé une nouvelle catégorie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: La catégorie nouvellement crée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "No category found"
 */
