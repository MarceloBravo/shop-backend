import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { PantallaModel } = db;

describe('Integration Test: HardDeletePantallaController', () => {
    let token, pantalla;

    beforeAll(async () => {
        token = await createUserAndLogin();
        pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should permanently delete a pantalla', async () => {
        await request(app)
            .delete(`/api/v1/pantalla/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedPantalla = await PantallaModel.findByPk(pantalla.id, { paranoid: false });
        expect(deletedPantalla).toBeNull();
    });
});
