import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function ressources(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getRessource = async (id, db, res) => {
    try {
      const category = await db
        .collection("resources")
        .find({ _id: ObjectId(id) })
        .toArray();
      return res.status(200).json({ category });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();
    console.log(" plop");
    switch (req.method) {
      case "GET": {
        const id = req.query.id;
        return await getRessource(id, db, res);
      }
      case "DELETE": {
        //return await deleteResource(db, res);
        break;
      }
      case "PUT": {
        //return await updateResource(db, res);
        break;
      }

      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req, res);
}
