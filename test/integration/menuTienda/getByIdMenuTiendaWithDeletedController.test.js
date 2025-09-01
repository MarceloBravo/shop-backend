import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MenuTiendaModel } = db;


describe('Integration Test: GetByIdMenuTiendaWithDeletedController', () => {
    let token, menuTienda;

    beforeAll(async () => {
        token = await createUserAndLogin();
        menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
        await menuTienda.destroy();
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should get a deleted menuTienda by id', async () => {
        const response = await request(app)
            .get(`/api/v1/menu_tienda/deleted/${menuTienda.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('icono');
        expect(response.body).toHaveProperty('pantalla_id');
        expect(response.body).toHaveProperty('posicion');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body.id).toBe(menuTienda.id);
        expect(response.body.deletedAt).not.toBeNull();
    });
});
