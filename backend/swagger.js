
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project 1 API',
      version: '1.0.0',
      description: 'API documentation for User, Opportunity, and Major endpoints',
    },
    servers: [
      {
        url: 'http://138.197.93.75:3001/api', 
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            name: { type: 'string', example: 'John Mensah' },
            email: { type: 'string', example: 'john@gmail.com' },
            major: { type: 'string', example: 'Computer Science' },
            year_graduated: { type: 'string', example: '2024' },
            company: { type: 'string', example: 'Google' },
            title: { type: 'string', example: 'Software Intern' },
          },
        },
        Opportunity: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: { type: 'string', example: 'Campus Cleanup' },
            description: { type: 'string', example: 'Help clean the campus grounds.' },
            type: { type: 'string', example: 'Volunteering' },
            is_paid: { type: 'boolean', example: false },
            amount: { type: 'number', example: 0 },
            posted_by: { type: 'string', example: 'admin@example.com' },
          },
        },
        Major: {
          type: 'object',
          required: ['name', 'department'],
          properties: {
            name: { type: 'string', example: 'Economics' },
            department: { type: 'string', example: 'Business' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
