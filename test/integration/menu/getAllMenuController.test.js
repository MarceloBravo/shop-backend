import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuModel } from '../../../src/models/MenuModel.js';

describe('Integration Test: GetAllMenuController', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        await MenuModel.bulkCreate([
            { nombre: 'Inicio', ruta: '/inicio', icono: 'home' },
            { nombre: 'Productos', ruta: '/productos', icono: 'store' },
        ]);
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should get all menus', async () => {
        const response = await request(app)
            .get('/api/v1/menu')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(2);
    });
});
