import clientPromise from "../../lib/mongodb";

export default function categories(req, res) {
  const getCategories = async (res) => {
    try {
      const client = await clientPromise;
      const db = await client.db(process.env.MONGO_DB_NAME);
      const categories = await db.collection("categories").find({}).toArray();
      console.log(categories);
      return res.status(200).json({ categories });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (method, res) => {
    switch (method) {
      case "GET": {
        return await getCategories(res);
      }
      default:
        return res.status(404).json("Le service demandé n'est pas disponible");
    }
  };

  return getRoute(req.method, res);
}
