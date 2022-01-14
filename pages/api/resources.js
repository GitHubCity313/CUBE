import clientPromise from "../../lib/mongodb";

export default function ressources(req, res) {
  const getRessources = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const resources = await db.collection("resources").find({}).toArray();
      return res.status(200).json({ resources });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };
  const getRoute = async (method, res) => {
    switch (method) {
      case "GET": {
        return await getRessources(res);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req.method, res);
}
