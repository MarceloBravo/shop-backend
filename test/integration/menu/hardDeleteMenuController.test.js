import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuModel } from '../../../src/models/MenuModel.js';

describe('Integration Test: HardDeleteMenuController', () => {
    let token, menu;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
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
