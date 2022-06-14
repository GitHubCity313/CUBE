import clientPromise from "../../../lib/mongodb";

export default function stats(req, res) {
  // Check token - ajouter
  const connect = async () => {
    const client = await clientPromise;
    const db = await client.db(process.env.MONGO_DB_NAME);
    return db;
  };

  const getCurrentYearInterval = () => {
    const now = Date.now();
    const currentDate = new Date(now);
    const startingYear = new Date(
      currentDate.getFullYear(),
      0,
      0
    ).toISOString();
    return { startingYear, currentDate: currentDate.toISOString() };
  };

  const getCurrentMonthInterval = () => {
    const now = Date.now();
    const currentDate = new Date(now);

    const startingDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).toISOString();
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).toISOString();

    return { startingDate, endDate };
  };

  const getAppStats = async (db, res) => {
    try {
      const resources = ["users", "resources", "comments"];
      const categories = await db.collection("categories").find({}).toArray();
      const statsByMonth = await Promise.all(
        resources.map(async (r) => await getMonthlyPublications(db, r))
      );
      const statsByYear = await Promise.all(
        resources.map(async (r) => await getYearlyPublication(db, r))
      );
      const monthlyPublicationsByCategories = await Promise.all(
        categories.map(
          async (cat) =>
            await getPublicationByCategories(db, cat._id, cat.name, "month")
        )
      );
      const yearlyPublicationsByCategories = await Promise.all(
        categories.map(
          async (cat) =>
            await getPublicationByCategories(db, cat._id, cat.name, "year")
        )
      );

      return res
        .status(200)
        .json({
          statsByMonth,
          statsByYear,
          monthlyPublicationsByCategories,
          yearlyPublicationsByCategories,
        });
    } catch (err) {
      return res.status(404).json({ err });
    }
  };

  const getMonthlyPublications = async (db, collection) => {
    try {
      const { startingDate, endDate } = getCurrentMonthInterval();
      const count = await db
        .collection(collection)
        .find({
          createdAt: {
            $gte: startingDate,
            $lt: endDate,
          },
        })
        .count();

      return { [`${collection}ByMonth`]: count };
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getYearlyPublication = async (db, collection) => {
    try {
      const { startingYear, currentDate } = getCurrentYearInterval();

      const count = await db
        .collection(collection)
        .find({
          createdAt: {
            $gte: startingYear,
            $lt: currentDate,
          },
        })
        .count();

      return { [`${collection}ByYear`]: count };
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getPublicationByCategories = async (db, cat, name, interval) => {
    try {
      const { startingDate, endDate } = getCurrentMonthInterval();
      const { startingYear, currentDate } = getCurrentYearInterval();
      const count = await db
        .collection("resources")
        .find({
          createdAt: {
            $gte: interval === "year" ? startingYear : startingDate,
            $lt: interval === "year" ? currentDate : endDate,
          },
          categories: name.toString(),
        })
        .count();
      return { [name]: count };
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getRoute = async (req, res) => {
    const db = await connect();

    switch (req.method) {
      case "GET": {
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
