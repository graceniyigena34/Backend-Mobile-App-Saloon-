import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SalonEase API',
      version: '1.0.0',
      description: 'API Documentation for the SalonEase Online Booking Platform',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Path to the API docs (where your routes are defined)
  apis: ['./src/routes/*.ts', './src/index.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);