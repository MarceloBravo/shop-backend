import request from 'supertest';
import app from '../../appTest.js';
import { TallaLetraModel } from '../../../src/models/TallaLetraModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetPageTallaLetra', () => {
    let token;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        await cleanTestTallaLetraes();
        await TallaLetraModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe obtener una página de tallaLetraes incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaLetra/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.valor === TEST_TALLA_LETRA);
        expect(found).toBeDefined();
    });
}); 