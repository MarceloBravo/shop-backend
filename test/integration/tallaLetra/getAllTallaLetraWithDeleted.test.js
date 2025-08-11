import request from 'supertest';
import { app } from '../../../src/index.js';
import { TallaLetraModel } from '../../../src/models/TallaLetraModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetAllTallaLetraWithDeletedController', () => {
    let token;
    let testTallaLetra;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
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

    it('debe listar los tallaLetraes eliminados lógicamente incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaLetra/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.valor === TEST_TALLA_LETRA);
        expect(found).toBeDefined();
        expect(found.deleted_at).not.toBeNull();
    });
}); 