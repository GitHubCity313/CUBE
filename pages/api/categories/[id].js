import { ObjectId } from "mongodb";
import { getItemById } from "../../../db/methods/db.getById";
import { updateItem } from "../../../db/methods/db.update";
import { deleteItem } from "../../../db/methods/db.delete";

export default function categories(req, res) {
  const getCategory = async (req, res) => {
    const id = req.query.id.trim();

    try {
      const category = await getItemById("categories", id);
      return res.status(200).json({ category });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const deleteCategory = async (req, res) => {
    const id = req.query.id.trim();
    const objectId = new ObjectId(id);
    try {
      const category = await deleteItem(objectId, "categories");
      return res.status(200).json({ category });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const updateCategory = async (req, res) => {
    const id = req.query.id.trim();
    const objectId = new ObjectId(id);
    const category = req.body;
    try {
      const update = await updateItem(objectId, category, "categories");
      return res.status(204).json({ update });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    switch (req.method) {
      case "GET":
        return await getCategory(req, res);
      case "DELETE":
        return await deleteCategory(req, res);
      case "PUT":
        return await updateCategory(req, res);
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
 *               message: "No catégories found"
 *   put:
 *     tags : [categories]
 *     description: Modifie les informations d'une catégorie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
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
 *               message: "No category found"
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
 *               message: "No category found"
 */
