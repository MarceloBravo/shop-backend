import request from 'supertest';
import { app } from '../../../src/index.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetPageTallaNumeroWithDeletedController', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
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

    it('debe obtener una página de tallaNumeroes eliminados lógicamente incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaNumero/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data).toHaveProperty('data');        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.valor === `${TEST_TALLA_LETRA}` && r.deleted_at !== null);
        expect(found).toBeDefined();
    });
}); 