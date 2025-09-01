import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MenuTiendaModel } = db;


describe('Integration Test: UpdateMenuTiendaController', () => {
    let token, menuTienda;

    beforeAll(async () => {
        token = await createUserAndLogin();
        menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'home', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should update a menuTienda', async () => {
        const updatedData = { nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home_2', posicion: 1, pantalla_id: null };
 
        const response = await request(app)
            .put(`/api/v1/menu_tienda/${menuTienda.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.nombre).toBe(updatedData.nombre);
    });
});
