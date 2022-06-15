import clientPromise from "../../../lib/mongodb";

export default function users(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const userRoleAssignation = async (user) => {
    try {
      const db = await connect();
      const userRole = await db
        .collection("roles")
        .findOne({ type: user.role });
      user.role = userRole._id;
      return user;
    } catch (err) {
      console.log("Error in role assignation");
      console.log(err);
    }
  };

  const getUsers = async (db, res) => {
    try {
      const users = await db.collection("users").find({}).toArray();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addUser = async (db, res, user) => {
    //assign the appropriate role
    user = await userRoleAssignation(user);
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const newUser = await db.collection("users").insertOne(user);
      return res.status(201).json({ newUser });
    } catch (err) {
      console.log("POST USER ERROR");
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (method, req, res) => {
    const db = await connect();

    switch (method) {
      case "GET": {
        return await getUsers(db, res);
      }
      case "POST": {
        const user = req.body;
        return await addUser(db, res, user);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  return getRoute(req.method, req, res);
}

/**
 * @swagger
 * /users:
 *   get:
 *     tags : [users]
 *     description: Retrouve la liste des utilisateurs.
 *     responses:
 *       200:
 *         description: L'ensemble des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "No user found"
 *   post:
 *     tags : [users]
 *     description: Créé une nouvel utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: La catégorie nouvellement crée
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
 *               message: "No user found"
 */
