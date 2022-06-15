import { connect } from "./db.connect";
import { ObjectId } from "mongodb";

export const updateItem = async (id, category, collection) => {
  const db = await connect();
  const objectId = new ObjectId(id);

  const filter = { _id: objectId };
  const updatedResource = {
    $set: {
      ...category,
    },
  };
  return await db.collection(collection).updateOne(filter, updatedResource);
};
