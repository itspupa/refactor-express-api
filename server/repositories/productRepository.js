// Repositories: communicate with MongoDB only (collection and queries)
import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";

const getCollection = async () => {
  const db = await getDb();
  return db.collection("products");
};

export const findAll = async (query) => {
  const collection = await getCollection();
  const results = await collection.find(query).limit(10).toArray();
  return results;
};

export const findById = async (id) => {
  const collection = await getCollection();
  const productId = new ObjectId(id);
  const result = await collection.findOne({ _id: productId });
  return result;
};

export const create = async (productData) => {
  const collection = await getCollection();
  const result = await collection.insertOne(productData);
  return result.insertedId;
};

export const update = async (id, updateData) => {
  const collection = await getCollection();
  const productId = new ObjectId(id);
  await collection.updateOne({ _id: productId }, { $set: updateData });
};

const deleteProduct = async (id) => {
  const collection = await getCollection();
  const productId = new ObjectId(id);
  await collection.deleteOne({ _id: productId });
};

export { deleteProduct as delete };


