import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { PantallaModel } = db;

describe('Integration Test: GetByIdPantallaWithDeletedController', () => {
    let token, pantalla;

    beforeAll(async () => {
        token = await createUserAndLogin();
        pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
        await pantalla.destroy();
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a deleted pantalla by id', async () => {
        const response = await request(app)
            .get(`/api/v1/pantalla/deleted/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('uri');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body.id).toBe(pantalla.id);
        expect(response.body.deletedAt).not.toBeNull();
    });
});
