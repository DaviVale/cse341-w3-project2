const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/auth');

const {
  productValidationRules,
  productIdValidation,
  validateRequest
} = require('../middleware/productValidation');

// GET /products - Returns all products
router.get(
  '/',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Returns all products stored in the inventory.'

    #swagger.responses[200] = {
      description: 'Products retrieved successfully.'
    }

    #swagger.responses[500] = {
      description: 'Failed to retrieve products.'
    }
  */
  productsController.getAll
);

// POST /products - Creates a new product
router.post(
  '/',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Creates a new product in the inventory. Authentication is required.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Product information',
      required: true,
      schema: {
        name: 'Cafeteira elétrica',
        description: 'Cafeteira elétrica com capacidade para 30 xícaras',
        price: 149.90,
        quantity: 8,
        brand: 'Mondial',
        sku: 'MON-CAF-001',
        category: 'Eletrodomésticos',
        supplier: 'Distribuidora Paraná'
      }
    }

    #swagger.responses[201] = {
      description: 'Product created successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid product data.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[500] = {
      description: 'Failed to create product.'
    }
  */
  isAuthenticated,
  productValidationRules,
  validateRequest,
  productsController.createProduct
);

// PUT /products/:id - Updates an existing product
router.put(
  '/:id',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Updates an existing product using its MongoDB document id. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB id of the product',
      required: true,
      type: 'string'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated product information',
      required: true,
      schema: {
        name: 'Mouse sem fio',
        description: 'Mouse ergonômico sem fio com conexão USB',
        price: 79.90,
        quantity: 15,
        brand: 'Logitech',
        sku: 'LOG-MOUSE-001',
        category: 'Eletrônicos',
        supplier: 'Distribuidora Tech Brasil'
      }
    }

    #swagger.responses[204] = {
      description: 'Product updated successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid product id or product data.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Product not found.'
    }

    #swagger.responses[500] = {
      description: 'Failed to update product.'
    }
  */
  isAuthenticated,
  productIdValidation,
  productValidationRules,
  validateRequest,
  productsController.updateProduct
);

// DELETE /products/:id - Deletes an existing product
router.delete(
  '/:id',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Deletes an existing product using its MongoDB document id. Authentication is required.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB id of the product',
      required: true,
      type: 'string'
    }

    #swagger.responses[204] = {
      description: 'Product deleted successfully.'
    }

    #swagger.responses[400] = {
      description: 'Invalid product id.'
    }

    #swagger.responses[401] = {
      description: 'Authentication required.'
    }

    #swagger.responses[404] = {
      description: 'Product not found.'
    }

    #swagger.responses[500] = {
      description: 'Failed to delete product.'
    }
  */
  isAuthenticated,
  productIdValidation,
  validateRequest,
  productsController.deleteProduct
);

module.exports = router;