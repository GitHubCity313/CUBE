import { getAll } from "../../../db/methods/db.getAll";
import { addItemToDB } from "../../../db/methods/db.add";

export default function categories(req, res) {
  const getCategories = async (res) => {
    try {
      const categories = await getAll("categories");
      return res.status(200).json({ categories });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addCategory = async (req, res) => {
    const category = req.body;
    try {
      const newCategory = await addItemToDB("categories", category);
      return res.status(201).json({ newCategory });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    switch (req.method) {
      case "GET": {
        return await getCategories(res);
      }
      case "POST": {
        return await addCategory(req, res);
      }
      default:
        return res
          .status(405)
          .json({
            err: "Method not allowed",
          })
          .end();
    }
  };

  return getRoute(req, res);
}

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
