const mongodb = require('../db/connect');

// Returns all products stored in the products collection
const getAll = async (req, res) => {
  try {
    // Retrieves every document from the products collection
    const products = await mongodb
      .getDb()
      .collection('products')
      .find()
      .toArray();

    // Sends the products back to the client with a successful status
    res.status(200).json(products);
  } catch (error) {
    // Handles unexpected database or server errors
    res.status(500).json({
      error: 'Failed to retrieve products'
    });
  }
};

// Creates a new product in the products collection
const createProduct = async (req, res) => {
  try {
    // Extracts the product fields sent in the request body
    const {
      name,
      description,
      price,
      quantity,
      brand,
      sku,
      category,
      supplier
    } = req.body;

    // Builds the product object that will be stored in MongoDB
    const product = {
      name,
      description,
      price,
      quantity,
      brand,
      sku,
      category,
      supplier
    };

    // Inserts the new product into MongoDB
    const result = await mongodb
      .getDb()
      .collection('products')
      .insertOne(product);

    // Returns the MongoDB id generated for the new product
    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    // Handles unexpected errors while creating the product
    res.status(500).json({
      error: 'Failed to create product'
    });
  }
};

module.exports = {
  getAll,
  createProduct
};