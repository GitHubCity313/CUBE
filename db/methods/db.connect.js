import clientPromise from "../../lib/mongodb";

export const connect = async () => {
  const client = await clientPromise;
  const db = await client.db(process.env.MONGO_DB_NAME);
  return db;
};
