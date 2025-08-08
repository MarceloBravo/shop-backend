import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';

describe('Integration Test: SoftDeletePantallaController', () => {
    let token, pantalla;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        pantalla = await PantallaModel.create({ nombre: 'Inicio', uri: '/inicio' });
    });

    afterAll(async () => {
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should soft delete a pantalla', async () => {
        await request(app)
            .patch(`/api/v1/pantalla/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        const deletedPantalla = await PantallaModel.findByPk(pantalla.id);
        expect(deletedPantalla).toBeNull();

        const deletedPantallaWithParanoid = await PantallaModel.findByPk(pantalla.id, { paranoid: false });
        expect(deletedPantallaWithParanoid).not.toBeNull();
        expect(deletedPantallaWithParanoid.deletedAt).not.toBeNull();
    });
});
