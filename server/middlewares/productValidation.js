// Middlewares: validate/transform request before reaching controllers

export const validateProduct = (req, res, next) => {
  const { name, price, image, description, category } = req.body || {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "name must be a non-empty string" });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({ message: "price must be a number > 0" });
  }
  if (typeof image !== "string" || !image.trim()) {
    return res.status(400).json({ message: "image must be a non-empty string" });
  }
  if (
    typeof description !== "string" ||
    !description.trim() ||
    description.trim().length < 10
  ) {
    return res
      .status(400)
      .json({ message: "description must be a non-empty string with min length 10" });
  }
  if (typeof category !== "string" || !category.trim()) {
    return res
      .status(400)
      .json({ message: "category must be a non-empty string" });
  }

  next();
};


