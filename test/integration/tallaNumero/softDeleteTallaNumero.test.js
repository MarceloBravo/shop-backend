import request from 'supertest';
import { app } from '../../../src/index.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: SoftDeleteTallaNumero', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        testTallaNumero = await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe eliminar lógicamente un tallaNumero', async () => {
        const response = await request(app)
            .patch(`/api/v1/tallaNumero/${testTallaNumero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('code', 200);
        expect(response.body).toHaveProperty('id', `${testTallaNumero.id}`);
        expect(response.body).toHaveProperty('mensaje');
        // Verifica que el registro sigue existiendo pero con deleted_at no nulo
        const tallaNumero = await TallaNumericaModel.findByPk(testTallaNumero.id, { paranoid: false });
        expect(tallaNumero).not.toBeNull();
        expect(tallaNumero.deleted_at).not.toBeNull();
    });
}); 