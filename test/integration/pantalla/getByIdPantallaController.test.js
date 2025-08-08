import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';

describe('Integration Test: GetByIdPantallaController', () => {
    let token, pantalla;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a pantalla by id', async () => {
        const response = await request(app)
            .get(`/api/v1/pantalla/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('uri');
        expect(response.body.id).toBe(pantalla.id);
    });

    it('should return 404 if pantalla not found', async () => {
        await request(app)
            .get('/api/v1/pantalla/999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
    });
});
