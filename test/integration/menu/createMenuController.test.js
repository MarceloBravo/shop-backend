import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const {MenuModel } = db;


describe('Integration Test: CreateMenuController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    afterEach(async () => {
        await MenuModel.destroy({ where: {}, force: true });
    });

    it('should create a new menu and return success response', async () => {
        const menuData = {
            nombre: 'Inicio_test',
            ruta: '/inicio_test',
            icono: 'home'
        };

        const response = await request(app)
            .post('/api/v1/menu')
            .set('Authorization', `Bearer ${token}`)
            .send(menuData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(menuData.nombre);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '',
        };

        const response = await request(app)
            .post('/api/v1/menu')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
