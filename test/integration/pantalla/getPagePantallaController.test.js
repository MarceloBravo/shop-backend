import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { PantallaModel } = db;

describe('Integration Test: GetPagePantallaController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await PantallaModel.bulkCreate([
            { nombre: 'Inicio', uri: '/inicio' },
            { nombre: 'Productos', uri: '/productos' },
        ]);
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a paginated list of pantallas', async () => {
        const response = await request(app)
            .get('/api/v1/pantalla/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(2);
    });
});
