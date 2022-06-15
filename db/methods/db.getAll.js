import { connect } from "./db.connect";

export const getAll = async (type) => {
  const db = await connect();
  return await db.collection(type).find({}).toArray();
};
