const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Inventory API',
    description: 'API documentation for the inventory project'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);