import clientPromise from "../../../lib/mongodb";

export default function categories(req, res) {
  // connexion a la db
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getCategories = async (db, res) => {
    try {
      const categories = await db.collection("categories").find({}).toArray();
      return res.status(200).json({ categories });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const addCategory = async (db, res, category) => {
    try {
      const newCategory = await db.collection("categories").insertOne(category);
      return res.status(201).json({ newCategory });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();

    switch (req.method) {
      case "GET": {
        return await getCategories(db, res);
      }
      case "POST": {
        const category = req.body;
        return await addCategory(db, res, category);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}
