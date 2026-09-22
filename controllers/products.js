const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

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
    return res.status(200).json(products);
  } catch (error) {
    // Handles unexpected database or server errors
    return res.status(500).json({
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
    return res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    // Handles unexpected errors while creating the product
    return res.status(500).json({
      error: 'Failed to create product'
    });
  }
};

// Updates an existing product using its MongoDB document id
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Creates an object with the updated product information
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      brand: req.body.brand,
      sku: req.body.sku,
      category: req.body.category,
      supplier: req.body.supplier
    };

    // Updates the product that matches the provided MongoDB id
    const result = await mongodb
      .getDb()
      .collection('products')
      .updateOne(
        { _id: new ObjectId(productId) },
        { $set: product }
      );

    // Returns 404 when the product id is valid but no product was found
    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    // Returns 204 when the update is completed successfully
    return res.status(204).send();
  } catch (error) {
    // Handles unexpected errors during the update operation
    return res.status(500).json({
      error: 'Failed to update product'
    });
  }
};

// Deletes an existing product using its MongoDB document id
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Deletes the product that matches the provided MongoDB id
    const result = await mongodb
      .getDb()
      .collection('products')
      .deleteOne({ _id: new ObjectId(productId) });

    // Returns 404 when no product matches the provided id
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Product not found'
      });
    }

    // Returns 204 when the product is deleted successfully
    return res.status(204).send();
  } catch (error) {
    // Handles unexpected errors during the delete operation
    return res.status(500).json({
      error: 'Failed to delete product'
    });
  }
};

module.exports = {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct
};