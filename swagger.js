const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Inventory API',
    description: 'API documentation for the inventory project'
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

// Generates the Swagger documentation from the API routes
swaggerAutogen(outputFile, endpointsFiles, doc);