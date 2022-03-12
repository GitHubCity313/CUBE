import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function comments(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getCommentsFromResourceId = async (db, res, resourceId) => {
    try {
      const comments = await db
        .collection("comments")
        .find({ relatedResource: ObjectId(resourceId) })
        .toArray();
      return res.status(200).json({ comments });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const deleteComment = async (db, res, id) => {
    const itemId = new ObjectId(id);
    try {
      const deletedItem = await db
        .collection("comments")
        .deleteOne({ _id: itemId });
      return res.status(204).json({ deletedItem });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ e });
    }
  };

  const updateComment = async (db, res, comment, id) => {
    const itemId = new ObjectId(id);
    try {
      const filter = { _id: itemId };
      const update = {
        $set: {
          ...comment,
        },
      };
      const updatedItem = await db
        .collection("comments")
        .updateOne(filter, update);
      return res.status(204).json({ updatedItem });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ e });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();
    const id = req.query.id.trim();
    const comment = req?.body ? req.body : null;

    switch (req.method) {
      case "GET": {
        return await getCommentsFromResourceId(db, res, id);
      }
      case "DELETE": {
        return await deleteComment(db, res, id);
      }
      case "PUT": {
        delete comment._id;
        delete comment.relatedResource;
        delete comment.author;
        return await updateComment(db, res, comment, id);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}
