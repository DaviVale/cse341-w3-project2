const express = require('express');
const mongodb = require('./db/connect');
const productsRoutes = require('./routes/products');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const categoriesRoutes = require('./routes/categories');

// Allows Express to read JSON data sent in request bodies
app.use(express.json());

// Serves the interactive Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connects requests that start with /products to the product routes
app.use('/products', productsRoutes);

// Connects requests that start with /categories to the category routes
app.use('/categories', categoriesRoutes);

// Simple route used to verify that the API is online
app.get('/', (req, res) => {
  try {
    return res.status(200).send('Inventory API is running');
  } catch (error) {
    // Handles unexpected errors on the root route
    return res.status(500).json({
      error: 'Failed to load the API'
    });
  }
});

// Connects to MongoDB before starting the Express server
mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Prevents the API from starting if the database connection fails
    console.error('Server could not start:', error);
  });