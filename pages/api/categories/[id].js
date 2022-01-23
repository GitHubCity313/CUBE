import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function categories(req, res) {
  // connexion a la db
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

  const getRoute = async (req, res) => {
    const db = await connect();

    switch (req.method) {
      case "GET": {
        const id = req.query.id;
        return await getCategory(id, db, res);
      }
      case "DELETE": {
        //return await deleteCategory(db, res);
        break;
      }
      case "PUT": {
        //return await updateCategory(db, res);
        break;
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req, res);
}
