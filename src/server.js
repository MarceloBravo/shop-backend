import app from './app.js';
import dbPromise from './models/index.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig.js';
import rutas from './routes/rutas.js';


const main = async () => {
    try {
        // 1. Espera a que la promesa de la BD se resuelva. 
        //    Esto asegura que todos los modelos y relaciones están cargados.
        const db = dbPromise;

        const API_PREFIX = '/api/v1';

        rutas.forEach(({ path, router }) => {
            app.use(`${API_PREFIX}${path}`, router);
        });


        // 2. Sincroniza la base de datos.
        //    `alter: true` actualiza el esquema sin borrar datos. Es seguro para desarrollo.
        await db.sequelize.sync({ alter: true }); 
        console.log('Base de datos sincronizada correctamente.');

        // 3. Configura la documentación de Swagger
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // 4. Inicia el servidor solo si no estamos en modo 'test'
        if (process.env.NODE_ENV?.trim() !== 'test') {
            console.log('Iniciando servidor')
            const host = app.get('host');
            const port = app.get('port');
            app.listen(port, host, () => {
                console.log(`Servidor activo en http://${host}:${port}`);
            });
        }
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
        process.exit(1); // Termina el proceso si la inicialización falla
    }
};

// Llama a la función principal para iniciar
main();

// Exporta la app para que pueda ser usada en los tests de integración
export default app;