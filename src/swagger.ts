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
      schemas: {
        Booking: {
          type: 'object',
          properties: {
            customer: { type: 'string' },
            service: { type: 'string' },
            salon: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            time: { type: 'string' },
            status: { type: 'string' },
            notes: { type: 'string' },
          },
        },
        Salon: {
          type: 'object',
          properties: {
            owner: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            address: { type: 'object' },
            location: { type: 'object' },
            openingHours: { type: 'array', items: { type: 'object' } },
            services: { type: 'array', items: { type: 'string' } },
            images: { type: 'array', items: { type: 'string' } },
            isActive: { type: 'boolean' },
          },
        },
        Service: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'number' },
            price: { type: 'number' },
            category: { type: 'string' },
            salon: { type: 'string' },
            isActive: { type: 'boolean' },
          },
        },
        Notification: {
          type: 'object',
          properties: {
            user: { type: 'string' },
            title: { type: 'string' },
            message: { type: 'string' },
            type: { type: 'string' },
            isRead: { type: 'boolean' },
            metadata: { type: 'object' },
          },
        },
        AuthLoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                role: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  // Path to the API docs (where your routes are defined)
  apis: ['./src/routes/*.ts', './src/index.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);
