const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Inventory API',
    description: 'API documentation for the inventory project'
  },
  host: 'cse341-w3-project2.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

// Generates the Swagger documentation from the API routes
swaggerAutogen(outputFile, endpointsFiles, doc);