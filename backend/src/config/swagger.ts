import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lead Notes API",
      version: "1.0.0",
      description: "A simple Lead Notes API with Firebase Authentication",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://leadnotes-production.up.railway.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Firebase ID Token",
        },
      },
      schemas: {
        Note: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Note ID",
            },
            title: {
              type: "string",
              description: "Note title",
            },
            content: {
              type: "string",
              description: "Note content",
            },
            userId: {
              type: "string",
              description: "Firebase user ID",
            },
            userEmail: {
              type: "string",
              description: "User email",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
          },
        },
        CreateNoteRequest: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: {
              type: "string",
              description: "Note title",
              maxLength: 100,
            },
            content: {
              type: "string",
              description: "Note content",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
