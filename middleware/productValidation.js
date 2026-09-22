const { body, param, validationResult } = require('express-validator');

// Defines the validation rules used when creating or updating a product
const productValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),

  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be an integer greater than or equal to 0'),

  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required'),

  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU is required'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),

  body('supplier')
    .trim()
    .notEmpty()
    .withMessage('Supplier is required')
];

// Validates that the id parameter follows the MongoDB ObjectId format
const productIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID')
];

// Checks the validation results and stops the request when invalid data is found
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  // Continues to the controller only when all validation rules pass
  next();
};

module.exports = {
  productValidationRules,
  productIdValidation,
  validateRequest
};