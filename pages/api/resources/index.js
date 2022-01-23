import clientPromise from "../../../lib/mongodb";

export default function ressources(req, res) {
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getRessources = async (db, res) => {
    try {
      const resources = await db.collection("resources").find({}).toArray();
      return res.status(200).json({ resources });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addResource = async (db, res, resource) => {
    try {
      const newResource = await db.collection("resources").insertOne(resource);
      return res.status(201).json({ newResource });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();
    switch (req.method) {
      case "GET": {
        return await getRessources(db, res);
      }
      case "POST": {
        const resource = req.body;
        return await addResource(db, res, resource);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req, res);
}
