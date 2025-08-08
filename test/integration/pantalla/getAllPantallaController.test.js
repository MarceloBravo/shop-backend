import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';

describe('Integration Test: GetAllPantallaController', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        await PantallaModel.bulkCreate([
            { nombre: 'Inicio', uri: '/inicio' },
            { nombre: 'Productos', uri: '/productos' },
        ]);
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get all pantallas', async () => {
        const response = await request(app)
            .get('/api/v1/pantalla')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(2);
    });
});
