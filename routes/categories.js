const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');

const {
  categoryValidationRules,
  categoryIdValidation,
  validateCategoryRequest
} = require('../middleware/categoryValidation');

// GET /categories - Returns all categories
router.get(
  '/',
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Returns all categories stored in the inventory.'

    #swagger.responses[200] = {
      description: 'Categories retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'Failed to retrieve categories.'
    }
  */
  categoriesController.getAll
);

// POST /categories - Creates a new category
router.post(
  '/',
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Creates a new category in the inventory.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Category information',
      required: true,
      schema: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e acessórios',
        department: 'Tecnologia',
        active: true
      }
    }

    #swagger.responses[201] = {
      description: 'Category created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid category data.'
    }

    #swagger.responses[500] = {
      description: 'Failed to create category.'
    }
  */
  categoryValidationRules,
  validateCategoryRequest,
  categoriesController.createCategory
);

// PUT /categories/:id - Updates an existing category
router.put(
  '/:id',
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Updates an existing category using its MongoDB document id.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB id of the category',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated category information',
      required: true,
      schema: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos, acessórios e periféricos',
        department: 'Tecnologia',
        active: true
      }
    }

    #swagger.responses[204] = {
      description: 'Category updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid category id or category data.'
    }

    #swagger.responses[404] = {
      description: 'Category not found.'
    }

    #swagger.responses[500] = {
      description: 'Failed to update category.'
    }
  */
  categoryIdValidation,
  categoryValidationRules,
  validateCategoryRequest,
  categoriesController.updateCategory
);

// DELETE /categories/:id - Deletes an existing category
router.delete(
  '/:id',
  /*
    #swagger.tags = ['Categories']
    #swagger.description = 'Deletes an existing category using its MongoDB document id.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB id of the category',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Category deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid category id.'
    }

    #swagger.responses[404] = {
      description: 'Category not found.'
    }

    #swagger.responses[500] = {
      description: 'Failed to delete category.'
    }
  */
  categoryIdValidation,
  validateCategoryRequest,
  categoriesController.deleteCategory
);

module.exports = router;