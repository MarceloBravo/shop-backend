import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';

describe('Integration Test: UpdatePantallaController', () => {
    let token, pantalla;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should update a pantalla', async () => {
        const updatedData = { nombre: 'Home', uri: '/home' };

        const response = await request(app)
            .put(`/api/v1/pantalla/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.nombre).toBe(updatedData.nombre);
    });
});
