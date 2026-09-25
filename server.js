require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongodb = require('./db/connect');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

// Allows Express to read JSON data sent in request bodies
app.use(express.json());

// Creates a session for authenticated users
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  })
);

// Initializes Passport authentication
app.use(passport.initialize());

// Allows Passport to use Express sessions
app.use(passport.session());

// Serves the interactive Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connects authentication requests to the OAuth routes
app.use('/auth', authRoutes);

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