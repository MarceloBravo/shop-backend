import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuModel } from '../../../src/models/MenuModel.js';

describe('Integration Test: GetPageMenuController', () => {
    let token;

    beforeAll(async () => {
        token = global.testToken
        await MenuModel.bulkCreate([
            { nombre: 'Inicio', ruta: '/inicio', icono: 'home' },
            { nombre: 'Productos', ruta: '/productos', icono: 'store' },
        ]);
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should get a paginated list of menus', async () => {
        const response = await request(app)
            .get('/api/v1/menu/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(2);
    });
});
