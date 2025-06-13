import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import request from 'supertest';
import app from '../../../index.js';
import { sequelize } from '../../../config/database.js';

describe('Integration Test: CreateColorController', () => {
    let token;
    
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Sincroniza la base de datos para pruebas
        // Realiza login para obtener el token
        const loginResponse = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
                host: 'localhost'
            })
            .expect(200);

        token = loginResponse.body.access_token; // Guarda el token para usarlo en los tests
    });

    afterAll(async () => {
        await sequelize.close(); // Cierra la conexión después de las pruebas
    });

    it('should create a new color and return success response', async () => {
        const colorData = {
            nombre: 'Rojo',
            valor: '#FF0000'
        };

        const response = await request(app)
            .post('/api/colors') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(colorData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(colorData.nombre);
        expect(response.body.data.valor).toBe(colorData.valor);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            valor: ''
        };

        const response = await request(app)
            .post('/api/colors')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
