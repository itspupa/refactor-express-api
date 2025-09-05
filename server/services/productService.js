// Services: handle business logic, not tied to DB directly
import * as productRepository from "../repositories/productRepository.js";

export const getAllProducts = async (name, category) => {
  const query = {};
  if (name) {
    query.name = new RegExp(name, "i");
  }
  if (category) {
    query.category = new RegExp(category, "i");
  }
  return productRepository.findAll(query);
};

export const getProductById = async (id) => {
  return productRepository.findById(id);
};

export const createProduct = async (productData) => {
  const dataToInsert = { ...productData, created_at: new Date() };
  const insertedId = await productRepository.create(dataToInsert);
  return insertedId;
};

export const updateProduct = async (id, productData) => {
  const dataToUpdate = { ...productData, modified_at: new Date() };
  await productRepository.update(id, dataToUpdate);
};

export const deleteProduct = async (id) => {
  await productRepository.delete(id);
};


