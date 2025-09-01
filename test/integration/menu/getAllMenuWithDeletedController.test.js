import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const {MenuModel } = db;

describe('Integration Test: GetAllMenuWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        const menu = await MenuModel.create({ nombre: 'Inicio', ruta: '/inicio', icono: 'home' });
        await menu.destroy();
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should get all menus including deleted', async () => {
        const response = await request(app)
            .get('/api/v1/menu/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0]).toHaveProperty('deletedAt');
    });
});
