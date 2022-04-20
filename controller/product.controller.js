const Product = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const Product = await Product.create(req.body);
    res.status(201).json()
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const getAllProducts = async (req, res) => {
  try {
  const Products = await Product.find({ price: { $gt: 20} });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const ProductId = req.params.ProductId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const ProductId = req.params.ProductId;
    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
  const ProductId = req.params.ProductId;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({ msg: "Product not found" });
  }
    await Product.findByIdAndDelete(productId);
    res.status(200).json({msg: "Post Deleted"});
  }catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};