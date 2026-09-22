const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// Returns all categories stored in the categories collection
const getAll = async (req, res) => {
  try {
    // Retrieves every document from the categories collection
    const categories = await mongodb
      .getDb()
      .collection('categories')
      .find()
      .toArray();

    // Sends the categories back to the client
    return res.status(200).json(categories);
  } catch (error) {
    // Handles unexpected database or server errors
    return res.status(500).json({
      error: 'Failed to retrieve categories'
    });
  }
};

// Creates a new category in the categories collection
const createCategory = async (req, res) => {
  try {
    // Extracts the category fields sent in the request body
    const {
      name,
      description,
      department,
      active
    } = req.body;

    // Builds the category object that will be stored in MongoDB
    const category = {
      name,
      description,
      department,
      active
    };

    // Inserts the new category into MongoDB
    const result = await mongodb
      .getDb()
      .collection('categories')
      .insertOne(category);

    // Returns the MongoDB id generated for the new category
    return res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    // Handles unexpected errors while creating the category
    return res.status(500).json({
      error: 'Failed to create category'
    });
  }
};

// Updates an existing category using its MongoDB document id
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Creates an object with the updated category information
    const category = {
      name: req.body.name,
      description: req.body.description,
      department: req.body.department,
      active: req.body.active
    };

    // Updates the category that matches the provided MongoDB id
    const result = await mongodb
      .getDb()
      .collection('categories')
      .updateOne(
        { _id: new ObjectId(categoryId) },
        { $set: category }
      );

    // Returns 404 when the category id is valid but no category was found
    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    // Returns 204 when the update is completed successfully
    return res.status(204).send();
  } catch (error) {
    // Handles unexpected errors during the update operation
    return res.status(500).json({
      error: 'Failed to update category'
    });
  }
};

// Deletes an existing category using its MongoDB document id
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Deletes the category that matches the provided MongoDB id
    const result = await mongodb
      .getDb()
      .collection('categories')
      .deleteOne({ _id: new ObjectId(categoryId) });

    // Returns 404 when no category matches the provided id
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Category not found'
      });
    }

    // Returns 204 when the category is deleted successfully
    return res.status(204).send();
  } catch (error) {
    // Handles unexpected errors during the delete operation
    return res.status(500).json({
      error: 'Failed to delete category'
    });
  }
};

module.exports = {
  getAll,
  createCategory,
  updateCategory,
  deleteCategory
};