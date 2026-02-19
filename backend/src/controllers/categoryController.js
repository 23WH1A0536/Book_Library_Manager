const Category = require("../models/Category");

exports.create = async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
};

exports.getAll = async (req, res) => {
  const data = await Category.find();
  res.json(data);
};
