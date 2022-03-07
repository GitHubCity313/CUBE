import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import Joi from "joi";

export default function comments(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getCommentValidationSchema = () => {
    return Joi.object({
      relatedResource: Joi.string().alphanum().required().trim(),
      author: Joi.string().alphanum().required().trim(),
      title: Joi.string().required().trim(),
      value: Joi.string().required().trim(),
      createdAt: Joi.date().iso().required(),
      updatedAt: Joi.date().iso().required(),
      isReported: Joi.boolean(),
      isModerated: Joi.boolean(),
    });
  };

  const getUserFromToken = async (token) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err) {
      if (err) {
        return res.status(401).json({
          name: err.name,
          expiredAt: err.expiredAt,
        });
      }
    });
    const user = jwt.decode(token);
    const userData = user.data;
    return userData;
  };

  const createCommentModel = async (comment, token) => {
    const { relatedResource, title, value } = comment;

    const date = new Date();
    const dateToIso = date.toISOString();

    //vérifier le token en amont pour récupérer le nom prénom si il est ok
    const user = await getUserFromToken(token);

    const newComment = {
      relatedResource: ObjectId(relatedResource),
      author: ObjectId(user.id.toString()),
      title,
      value,
      createdAt: dateToIso,
      isReported: false,
      validationStatus: true,
      authorName: `${user.firstName} ${user.lastName}`,
    };
    return newComment;
  };

  const addComment = async (db, res, comment, token) => {
    try {
      const newComment = await createCommentModel(comment, token);
      const validation = await validateComment(newComment);
      const insertComment = await db
        .collection("comments")
        .insertOne(newComment);
      return res.status(201).json({ insertComment });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ e });
    }
  };

  const validateComment = async (comment) => {
    try {
      const schema = getCommentValidationSchema();
      return await schema.validateAsync({ comment });
    } catch (e) {
      return e;
    }
  };

  const getAllComments = async (db, res) => {
    try {
      const users = await db.collection("comments").find({}).toArray();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    let bodyR;
    const db = await connect();
    // const token = req.body.headers?.Authorization
    //   ? req.body.headers.Authorization
    //   : null;
    switch (req.method) {
      case "GET": {
        bodyR = req.body;
        const token = req.headers?.authorization
          ? req.headers.authorization
          : null;

        return await getAllComments(db, res, token);
      }
      case "POST": {
        bodyR = req.body;
        const token = req.headers?.authorization
          ? req.headers.authorization
          : null;
        return await addComment(db, res, bodyR, token);
      }

      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  getRoute(req, res);
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: uuid
 *           description: l'id du commentaire.
 *           example: trouver un truc
 *         relatedResource:
 *           type: uuid
 *           description: La ressource associée au commentaire.
 *           example: 61e165463d88f191f3f4e0d4
 *         author:
 *           type: int
 *           description: L'id de l'auteur de la ressource.
 *           example: 61e165463d88f191f3f4e0d4
 *         title:
 *           type: string
 *           description: Le titre de la ressource.
 *           example: 61e165463d88f191f3f4e0d4
 *         value:
 *           type: string
 *           description: Le contenu du commentaire.
 *           example: 61e165463d88f191f3f4e0d4
 *         createdAt:
 *           type: date
 *           description: La date de création de la ressource.
 *           example: 1630792800
 *         updatedAt:
 *           type: date
 *           description: La date de mise à jour de la ressource.
 *           example: 1630792800
 *         isReported:
 *           type: boolean
 *           description: La ressource a été reportee comme problematique par un utilisateur.
 *           example: true
 *         validationStatus:
 *           type: boolean
 *           description: La ressource a été moderée par un administrateur.
 *           example: true
 */
