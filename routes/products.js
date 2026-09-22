const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get(
  '/',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Returns all products.'

    #swagger.responses[200] = {
      description: 'Products retrieved successfully.'
    }
  */
  productsController.getAll
);

router.post(
  '/',
  /*
    #swagger.tags = ['Products']
    #swagger.description = 'Creates a new product.'

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
  */
  productsController.createProduct
);

module.exports = router;