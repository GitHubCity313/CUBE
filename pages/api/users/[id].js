import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function userId(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getUser = async (id, db, res) => {
    try {
      const user = await db
        .collection("users")
        .find({ _id: ObjectId(id) })
        .toArray();
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const deleteUser = async (id) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const user = await db.collection("users").deleteOne({
        _id: ObjectId(id),
      });
      // [server_logs] confirm 200 from db
      console.log(`[200] DELETE user with id : ${id}`);
      // [server_logs] confirm if the item has been deleted ifnot show a warning
      user.result.n > 0
        ? console.log(`[SUCCESS] deletion confirmed`)
        : console.log(`[WARNING] No item deleted. Bad userId ? (${id})`);
      return res.status(200).json({ user });
    } catch (err) {
      // [server_logs]
      console.log(`[FAILED] DELETE user with id : ${id} : `);
      console.log(`Error response : \n${err}`);
      return res.status(404).json({ err });
    }
  };

  const updateUser = async (id, db, user, res) => {
    const objectId = new ObjectId(id);
    try {
      const filter = { _id: objectId };
      const updatedUser = {
        $set: {
          ...user,
        },
      };
      const update = await db
        .collection("users")
        .updateOne(filter, updatedUser);
      return res.status(204).json({ update });
    } catch (err) {
      console.log("erro in updateUser");
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();
    const id = req.query.id.trim();
    const user = req?.body ? req.body : null;

    switch (req.method) {
      case "GET": {
        const id = req.query.id;
        return await getUser(id, db, res);
      }
      case "DELETE":
        return await deleteUser(id.toString());
      case "PUT":
        return await updateUser(id, db, user, res);
      default:
        res.status(405).end("Method Not Allowed");
        break;
    }
  };

  return getRoute(req, res);
}


  /**
   * @swagger
   * /users/{id}:
   *   parameters:
   *     - in: path
   *       name: id
   *       required: true
   *       description: L'id de l'utilisateur.
   *       schema:
   *         type: integer
   *   get:
   *     tags : [users]
   *     description: Retrouve un utilisateur selon l'id.
   *     responses:
   *       200:
   *         description: L'utilisateur demandé
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Echec de la requête.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "fdkjsfjd"
   *   put:
   *     tags : [users]
   *     description: Modifie les informations d'un utilisateur.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: L'utilisateur avec les informations mises à jour
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Echec de la requête.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "fdkjsfjd"
   *   delete:
   *     tags : [users]
   *     description: Supprime un utilisateur.
   *     responses:
   *       204:
   *         description: 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Echec de la requête.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "fdkjsfjd"
   */