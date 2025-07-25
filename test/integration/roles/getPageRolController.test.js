import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: GetPageRolController', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
        await RolModel.create({ nombre: TEST_ROL_NAME });
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe obtener una página de roles incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/rol/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(Array.isArray(response.body.data.data)).toBe(true);
        const found = response.body.data.data.find(r => r.nombre === TEST_ROL_NAME);
        expect(found).toBeDefined();
    });
}); 