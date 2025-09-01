import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MenuTiendaModel } = db;


describe('Integration Test: HardDeleteMenuTiendaController', () => {
    let token, menuTienda;

    beforeAll(async () => {
        token = await createUserAndLogin();
        menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should permanently delete a menuTienda', async () => {
        await request(app)
            .delete(`/api/v1/menu_tienda/${menuTienda.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedMenuTienda = await MenuTiendaModel.findByPk(menuTienda.id, { paranoid: false });
        expect(deletedMenuTienda).toBeNull();
    });
});
