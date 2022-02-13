import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default function ressources(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getRessource = async (id, db, res) => {
    try {
      const resource = await db
        .collection("resources")
        .find({ _id: ObjectId(id) })
        .toArray();
      return res.status(200).json({ resource });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const deleteResource = async (id, db, res) => {
    const objectId = new ObjectId(id);
    try {
      const resource = await db
        .collection("resources")
        .deleteOne({ _id: objectId });
      return res.status(204).json({ resource });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const updateResource = async (id, db, resource, res) => {
    const objectId = new ObjectId(id);
    try {
      const filter = { _id: objectId };
      const updatedResource = {
        $set: {
          ...resource,
        },
      };
      const update = await db
        .collection("resources")
        .updateOne(filter, updatedResource);
      return res.status(204).json({ update });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };




  const getRoute = async (req, res) => {
    const db = await connect();
    const id = req.query.id.trim();
    const resource = req?.body ? req.body : null;

    switch (req.method) {
      case "GET": {
        return await getRessource(id, db, res);
      }
      case "DELETE": {
        return await deleteResource(id, db, res);
      }
      case "PUT": {
        return await updateResource(id, db, resource, res);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}
