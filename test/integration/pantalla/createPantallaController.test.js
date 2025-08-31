import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';

describe('Integration Test: CreatePantallaController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    afterEach(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should create a new pantalla and return success response', async () => {
        const pantallaData = {
            nombre: 'Inicio_test',
            uri: '/inicio_test'
        };

        const response = await request(app)
            .post('/api/v1/pantalla')
            .set('Authorization', `Bearer ${token}`)
            .send(pantallaData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(pantallaData.nombre);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '',
        };

        const response = await request(app)
            .post('/api/v1/pantalla')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
