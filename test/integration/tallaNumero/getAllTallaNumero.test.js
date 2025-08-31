import request from 'supertest';
import app from '../../appTest.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetAllTallaNumero', () => {
    let token;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe listar los registros incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaNumero')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.valor === `${TEST_TALLA_LETRA}`);
        expect(found).toBeDefined();
    });
}); 