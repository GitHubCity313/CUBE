import { connect } from "./db.connect";
import { ObjectId } from "mongodb";

export const deleteItem = async (id, collection) => {
  const db = await connect();
  const objectId = new ObjectId(id);
  return await db.collection(collection).deleteOne({ _id: objectId });
};
