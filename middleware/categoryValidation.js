const { body, param, validationResult } = require('express-validator');

// Defines the validation rules used when creating or updating a category
const categoryValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required'),

  body('active')
    .custom((value) => typeof value === 'boolean')
    .withMessage('Active must be a boolean')
];

// Validates that the id parameter follows the MongoDB ObjectId format
const categoryIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid category ID')
];

// Checks the validation results and stops the request when invalid data is found
const validateCategoryRequest = (req, res, next) => {
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
  categoryValidationRules,
  categoryIdValidation,
  validateCategoryRequest
};