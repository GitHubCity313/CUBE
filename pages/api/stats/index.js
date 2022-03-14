import clientPromise from "../../../lib/mongodb";

export default function stats(req, res) {
  // Check token - ajouter
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getAppStats = async (db, res, token) => {
    try {
      const currentDate = new Date();
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      console.log(currentMonth, currentYear);

      const startingDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(`${currentYear}-${currentMonth}-01`);

      console.log(startingDate, endDate);

      const createdResources = await db
        .collection("resources")
        .find({ createdAt: { $gte: startingDate, $lt: endDate } })
        .toArray();

      if (createdResources) {
        console.log(createdResources);
      }

      return res.status(200).json({ createdResoures });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err });
    }
  };
  const getRoute = async (req, res) => {
    const db = await connect();
    const token = req.body.headers?.Authorization
      ? req.body.headers.Authorization
      : null;

    switch (req.method) {
      case "POST": {
        const token = req.headers?.authorization
          ? req.headers.authorization
          : null;
        return await getAppStats(db, res, token);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  return getRoute(req, res);
}
