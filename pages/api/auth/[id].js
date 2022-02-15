import clientPromise from "../../../lib/mongodb";
import sendConfirmationEmail from "../../../lib/nodemailer";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export default function auth(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const signIn = async (credentials, refetchInterval) => {
    try {
      const { email, password } = credentials;
      const db = await connect();
      const user = await db
        .collection("users")
        .find({ email, password })
        .toArray();

      if (user && user.length !== 0) {
        const { firstName, lastName, role, _id, profilePic } = user.shift();
        const token = jwt.sign(
          { data: { id: _id, firstName, lastName, role, profilePic } },
          process.env.JWT_SECRET,
          {
            expiresIn: refetchInterval,
          }
        );

        res.status(200).json({
          token,
        });
      } else {
        throw Error;
      }
    } catch (err) {
      return res
        .status(404)
        .json({ message: "Adresse mail ou mot de passe incorrect" });
    }
  };

  const signUp = async (user) => {
    try {
      const newUser = generateUserModel(user);
      const db = await connect();
            console.log("req", newUser);
      const signUp = await db.collection("users").insertOne(newUser);



      //TODO - une verif de línsertion avant envoi de mail
      sendConfirmationEmail(
        newUser.lastName,
        newUser.firstName,
        newUser.email,
        newUser.confirmationCode
      );

      return res.status(201).json({ newUser });
    } catch (err) {
      console.log("POST USER ERROR");
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const generateConfimationCode = () => uuidv4();

  const generateUserModel = (user) => {
    const { lastName, firstName, email, password } = user;
    console.log(user);
    const newUser = {
      lastName,
      firstName,
      email,
      password,
      enabled: true,
      profilePic: "",
      seen: [],
      hasEvents: [],
      hasEventsCreated: [],
      likes: [],
      role: ObjectId("61e165463d88f191f3f4e0d4"),
      isValidated: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      confirmationCode: generateConfimationCode(),
    };

    return newUser;
  };

  const checkToken = async (token) => {
    // Verifie si le token est valide
    jwt.verify(token, process.env.JWT_SECRET, function (err) {
      if (err) {
        return res.status(401).json({
          name: err.name,
          expiredAt: err.expiredAt,
        });
      }
    });
    // Faire expirer le token a la deco
    return res.status(200).json();
  };

  const getRoute = async (req, res) => {
    const id = req.query.id;
    const token = req.body.headers?.Authorization
      ? req.body.headers.Authorization
      : null;

    console.log(id);
    switch (id) {
      case "signIn":
        const { credentials, refetchInterval } = req.body;
        return await signIn(credentials, refetchInterval);
      case "signUp":
        const { user } = req.body;
        console.log(user);
        return await signUp(user);
      case "checkToken":
        return await checkToken(token);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     tags : [users, auth]
 *     description: Permet à un utilisateur de s'inscrire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               lastName:
 *                 type: string
 *               firstName:
 *                 type: string
 *     responses:
 *       201:
 *         description: L'utilisateur a été crée
 *       404:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Erreur lors de l'inscription"
 * /auth/signIn:
 *   post:
 *     tags : [users, auth]
 *     description: Permet à un utilisateur de se connecter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'utilisateur a été crée
 *       401:
 *         description: Echec de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Adresse mail ou mot de passe incorrect"
 */
