import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaNumericaModel } = db;

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetPageTallaNumero', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe obtener una página de tallaNumeroes excluyendo eliminados', async () => {
        const response = await request(app)
            .get('/api/v1/tallaNumero/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data).toHaveProperty('data');
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.valor === `${TEST_TALLA_LETRA}`);
        expect(found).toBeDefined();
    });
}); 