import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuTiendaModel } from '../../../src/models/MenuTiendaModel.js';

describe('Integration Test: SoftDeleteMenuTiendaController', () => {
    let token, menuTienda;

    beforeAll(async () => {
        token = global.testToken
        menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should soft delete a menuTienda', async () => {
        await request(app)
            .patch(`/api/v1/menu_tienda/${menuTienda.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedMenuTienda = await MenuTiendaModel.findByPk(menuTienda.id);
        expect(deletedMenuTienda).toBeNull();

        const deletedMenuTiendaWithParanoid = await MenuTiendaModel.findByPk(menuTienda.id, { paranoid: false });
        expect(deletedMenuTiendaWithParanoid).not.toBeNull();
        expect(deletedMenuTiendaWithParanoid.deletedAt).not.toBeNull();
    });
});
