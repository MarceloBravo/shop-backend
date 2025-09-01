import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const {MenuModel } = db;

describe('Integration Test: HardDeleteMenuController', () => {
    let token, menu;

    beforeAll(async () => {
        token = await createUserAndLogin();
        menu = await MenuModel.create({ nombre: 'Inicio', ruta: '/inicio', icono: 'home' });
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should permanently delete a menu', async () => {
        await request(app)
            .delete(`/api/v1/menu/${menu.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedMenu = await MenuModel.findByPk(menu.id, { paranoid: false });
        expect(deletedMenu).toBeNull();
    });
});
