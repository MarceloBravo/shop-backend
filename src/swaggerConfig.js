
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop Backend API',
      version: '1.0.0',
      description: 'Documentación de la API para el backend de la tienda.',
    },
    servers: [
      {
        url: 'https://shop-backend-production-acc2.up.railway.app', // Asegúrate de que coincida con tu servidor
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./swagger-docs/**/*.yaml'], // Rutas a documentar
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
