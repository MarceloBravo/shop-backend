import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuTiendaModel } from '../../../src/models/MenuTiendaModel.js';

describe('Integration Test: GetByIdMenuTiendaController', () => {
    let token, menuTienda;

    beforeAll(async () => {
        token = global.testToken
        menuTienda = await MenuTiendaModel.create({ nombre: 'Home', icono: 'house', menu_padre_id: null, uri: '/home', posicion: 1, pantalla_id: null });
    });

    afterAll(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should get a menuTienda by id', async () => {
        const response = await request(app)
            .get(`/api/v1/menu_tienda/${menuTienda.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('icono');
        expect(response.body).toHaveProperty('pantalla_id');
        expect(response.body).toHaveProperty('posicion');
        expect(response.body.id).toBe(menuTienda.id);
    });

    it('should return 404 if menuTienda not found', async () => {
        await request(app)
            .get('/api/v1/menu_tienda/999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });
});
