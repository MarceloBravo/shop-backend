import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuModel } from '../../../src/models/MenuModel.js';

describe('Integration Test: GetByIdMenuWithDeletedController', () => {
    let token, menu;

    beforeAll(async () => {
        token = global.testToken
        menu = await MenuModel.create({ nombre: 'Inicio', ruta: '/inicio', icono: 'home' });
        await menu.destroy();
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should get a deleted menu by id', async () => {
        const response = await request(app)
            .get(`/api/v1/menu/deleted/${menu.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('icono');
        expect(response.body).toHaveProperty('pantalla_id');
        expect(response.body).toHaveProperty('posicion');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body.id).toBe(menu.id);
        expect(response.body.deletedAt).not.toBeNull();
    });
});
