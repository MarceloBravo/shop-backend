import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MenuTiendaModel } from '../../../src/models/MenuTiendaModel.js';

describe('Integration Test: CreateMenuTiendaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        await MenuTiendaModel.destroy({ where: {}, force: true });
    });

    it('should create a new menuTienda and return success response', async () => {
        const menuTiendaData = {
            nombre: 'Home', 
            icono: 'house', 
            menu_padre_id: null, 
            uri: '/home', 
            posicion: 1, 
            pantalla_id: null
        };

        const response = await request(app)
            .post('/api/v1/menu_tienda')
            .set('Authorization', `Bearer ${token}`)
            .send(menuTiendaData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(menuTiendaData.nombre);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', 
            icono: '', 
            menu_padre_id: null, 
            uri: null, 
            posicion: null, 
            pantalla_id: null
        };

        const response = await request(app)
            .post('/api/v1/menu_tienda')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
