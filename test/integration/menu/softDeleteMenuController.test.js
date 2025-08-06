import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuModel } from '../../../src/models/MenuModel.js';

describe('Integration Test: SoftDeleteMenuController', () => {
    let token, menu;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        menu = await MenuModel.create({ nombre: 'Inicio', ruta: '/inicio', icono: 'home' });
    });

    afterAll(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should soft delete a menu', async () => {
        await request(app)
            .patch(`/api/v1/menu/${menu.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedMenu = await MenuModel.findByPk(menu.id);
        expect(deletedMenu).toBeNull();

        const deletedMenuWithParanoid = await MenuModel.findByPk(menu.id, { paranoid: false });
        expect(deletedMenuWithParanoid).not.toBeNull();
        expect(deletedMenuWithParanoid.deletedAt).not.toBeNull();
    });
});
