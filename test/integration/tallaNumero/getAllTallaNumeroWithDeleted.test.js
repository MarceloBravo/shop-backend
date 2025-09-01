import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaNumericaModel } = db;

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetAllTallaNumeroWithDeletedController', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        testTallaNumero = await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
        // Soft delete del tallaNumero de prueba
        await testTallaNumero.destroy();
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe listar los tallaNumeroes eliminados lógicamente incluyendo eliminados', async () => {
        const response = await request(app)
            .get('/api/v1/tallaNumero/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.filter(r => r.valor === `${TEST_TALLA_LETRA}`);
        expect(found.length).toBe(1);
        expect(found[0].deleted_at).not.toBeNull();
    });
}); 