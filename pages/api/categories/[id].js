import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function categories(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };


  const getCategory = async (id, db, res) => {
    try {
      const category = await db
        .collection("categories")
        .find({ _id: ObjectId(id) })
        .toArray();
      return res.status(200).json({ category });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const deleteCategory = async (id, db, res) => {
    const objectId = new ObjectId(id);
    try {
      const category = await db
        .collection("categories")
        .deleteOne({ _id: objectId });
      return res.status(200).json({ category });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const updateCategory = async (id, db, category, res) => {
    const objectId = new ObjectId(id);
    try {
      const filter = { _id: objectId };
      const updatedResource = {
        $set: {
          ...category,
        },
      };
      const update = await db
        .collection("categories")
        .updateOne(filter, updatedResource);
      return res.status(204).json({ update });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();
    const id = req.query.id.trim();
    const category = req?.body ? req.body : null;

    switch (req.method) {
      case "GET": {
        const id = req.query.id;
        return await getCategory(id, db, res);
      }
      case "DELETE": {
        return await deleteCategory(id, db, res);
      }
      case "PUT": {
        return await updateCategory(id, db, category, res);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}


  /**
   * @swagger
   * /categories/{id}:
   *   parameters:
   *     - in: path
   *       name: id
   *       required: true
   *       description: L'id de la categorie demandée.
   *       schema:
   *         type: integer
   *   get:
   *     tags : [categories]
   *     description: Retrouve une categorie selon l'id demande.
   *     responses:
   *       200:
   *         description: La catégorie demandée
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
   *               message: "fdkjsfjd"
   *   put:
   *     tags : [categories]
   *     description: Modifie les informations d'une catégorie.
   *     responses:
   *       200:
   *         description: La catégorie avec les informations mises à jour
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
   *               message: "fdkjsfjd"
   *   delete:
   *     tags : [categories]
   *     description: Supprime une categorie spécifique.
   *     responses:
   *       204:
   *         description: 
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
   *               message: "fdkjsfjd"
   */