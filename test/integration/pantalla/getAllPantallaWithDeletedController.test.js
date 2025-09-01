import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { PantallaModel } = db;

describe('Integration Test: GetAllPantallaWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        const pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
        await pantalla.destroy();
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get all pantallas including deleted', async () => {
        const response = await request(app)
            .get('/api/v1/pantalla/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0]).toHaveProperty('deletedAt');
    });
});
