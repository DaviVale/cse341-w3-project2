const { MongoClient } = require('mongodb');

require('dotenv').config();

let database;

// Initializes the connection to MongoDB
const initDb = async () => {
  try {
    // Creates a MongoDB client using the connection string stored in .env
    const client = new MongoClient(process.env.MONGODB_URI);

    // Opens the connection with MongoDB
    await client.connect();

    // Selects the database created specifically for this project
    database = client.db('inventory_api');

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
};

// Returns the active database connection to the controllers
const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};