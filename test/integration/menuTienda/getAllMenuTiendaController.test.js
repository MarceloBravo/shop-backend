import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MenuTiendaModel } = db;


describe('Integration Test: GetAllMenuTiendaController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await MenuTiendaModel.bulkCreate([
            {nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null},
            {nombre: 'Dashboard', icono: 'dashboard', menu_padre_id: null, uri: '/dashboard', posicion: 2, pantalla_id: null}
        ]);
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should get all menuTiendas', async () => {
        const response = await request(app)
            .get('/api/v1/menu_tienda')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(2);
    });
});
