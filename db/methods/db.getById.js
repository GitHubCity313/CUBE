import { connect } from "./db.connect";

export const getItemById = async (collection, id) => {
  const db = await connect();
  return await db
    .collection(collection)
    .find({ _id: ObjectId(id) })
    .toArray();
};
