import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: GetAllRolWithDeletedController', () => {
    let token;
    let testRol;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
        testRol = await RolModel.create({ nombre: TEST_ROL_NAME });
        // Soft delete del rol de prueba
        await testRol.destroy();
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe listar los roles eliminados lógicamente incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/rol/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.nombre === TEST_ROL_NAME);
        expect(found).toBeDefined();
        expect(found.deleted_at).not.toBeNull();
    });
}); 