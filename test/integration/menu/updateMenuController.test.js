import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const {MenuModel } = db;

describe('Integration Test: UpdateMenuController', () => {
    let token, menu;

    beforeAll(async () => {
        token = await createUserAndLogin();
        menu = await MenuModel.create({ nombre: 'Inicio', ruta: '/inicio', icono: 'home' });
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should update a menu', async () => {
        const updatedData = { nombre: 'Home' };

        const response = await request(app)
            .put(`/api/v1/menu/${menu.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.nombre).toBe(updatedData.nombre);
    });
});
