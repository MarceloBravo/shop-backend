import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaLetraModel } = db;

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetPageTallaLetraWithDeletedController', () => {
    let token;
    let testTallaLetra;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });
    
    beforeEach(async () => {
        await cleanTestTallaLetraes();
        testTallaLetra = await TallaLetraModel.create({ valor: TEST_TALLA_LETRA });
        // Soft delete del tallaLetra de prueba
        await testTallaLetra.destroy();
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe obtener una página de tallaLetraes eliminados lógicamente incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaLetra/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data).toHaveProperty('data');        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.valor === TEST_TALLA_LETRA && r.deleted_at !== null);
        expect(found).toBeDefined();
    });
}); 