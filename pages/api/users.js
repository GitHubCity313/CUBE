import clientPromise from "../../lib/mongodb";

export default function users(req, res) {
  const getUsers = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const users = await db.collection("users").find({}).toArray();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (method, req, res) => {
    switch (method) {
      case "GET": {
        return await getUsers(res);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req.method, req, res);
}
