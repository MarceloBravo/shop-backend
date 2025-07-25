import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: GetPageRolWithDeletedController', () => {
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

    it('debe obtener una página de roles eliminados lógicamente incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/rol/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data).toHaveProperty('data');        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.nombre === TEST_ROL_NAME && r.deleted_at !== null);
        expect(found).toBeDefined();
    });
}); 