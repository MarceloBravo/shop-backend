import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MenuTiendaModel } = db;


describe('Integration Test: GetPageMenuTiendaWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        const menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
        await menuTienda.destroy();
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should get a paginated list of menuTiendas including deleted', async () => {
        const response = await request(app)
            .get('/api/v1/menu_tienda/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(1);
        expect(response.body.data.data[0]).toHaveProperty('deletedAt');
    });
});
