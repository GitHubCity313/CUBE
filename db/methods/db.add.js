import { connect } from "./db.connect";

export const addItemToDB = async (type, item) => {
  const db = await connect();
  return await db.collection(type).insertOne(item);
};
