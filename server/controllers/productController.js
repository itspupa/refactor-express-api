// Controllers: receive req/res only and call services
import * as productService from "../services/productService.js";

const toProductInputDto = (body = {}) => {
  const { name, price, image, description, category } = body;
  const normalizedPrice =
    typeof price === "string" && price.trim() !== "" ? Number(price) : price;
  return { name, price: normalizedPrice, image, description, category };
};

const toProductOutputDto = (payload = {}) => {
  const { name, price, image, description, category } = payload;
  return { name, price, image, description, category };
};

export const getAllProducts = async (req, res) => {
  try {
    const { keywords, category } = req.query || {};
    const products = await productService.getAllProducts(keywords, category);
    return res.json({ data: products });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.json({ data: product });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};

export const createProduct = async (req, res) => {
  try {
    const inputDto = toProductInputDto(req.body);
    const insertedId = await productService.createProduct(inputDto);
    const outputDto = toProductOutputDto(inputDto);
    return res.json({
      message: `Product Id ${insertedId} has been created successfully`,
      data: outputDto,
    });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const inputDto = toProductInputDto(req.body);
    await productService.updateProduct(id, inputDto);
    const outputDto = toProductOutputDto(inputDto);
    return res.json({
      message: `Movie record ${id} has been updated successfully`,
      data: outputDto,
    });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.json({
      message: `Movie record ${id} has been deleted successfully`,
    });
  } catch (error) {
    return res.json({ message: `${error}` });
  }
};


