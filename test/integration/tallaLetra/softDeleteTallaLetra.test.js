import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaLetraModel } = db;

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: SoftDeleteTallaLetra', () => {
    let token;
    let testTallaLetra;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaLetraes();
        testTallaLetra = await TallaLetraModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe eliminar lógicamente un tallaLetra', async () => {
        const response = await request(app)
            .patch(`/api/v1/tallaLetra/${testTallaLetra.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('code', 200);
        expect(response.body).toHaveProperty('id', `${testTallaLetra.id}`);
        expect(response.body).toHaveProperty('mensaje');
        // Verifica que el registro sigue existiendo pero con deleted_at no nulo
        const tallaLetra = await TallaLetraModel.findByPk(testTallaLetra.id, { paranoid: false });
        expect(tallaLetra).not.toBeNull();
        expect(tallaLetra.deleted_at).not.toBeNull();
    });
}); 