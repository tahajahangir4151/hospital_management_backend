import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Hospital Management System API",
      version: "1.0.0",
      description:
        "REST API documentation for the Hospital Management System",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;