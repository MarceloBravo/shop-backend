import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaNumericaModel } = db;

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: HardDeleteTallaNumero', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        testTallaNumero = await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe eliminar físicamente un tallaNumero', async () => {
        const response = await request(app)
            .delete(`/api/v1/tallaNumero/${testTallaNumero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', `${testTallaNumero.id}`);
        expect(response.body).toHaveProperty('mensaje');
        // Verifica que el registro ya no existe
        const tallaNumero = await TallaNumericaModel.findByPk(testTallaNumero.id, { paranoid: false });
        expect(tallaNumero).toBeNull();
    });
}); 