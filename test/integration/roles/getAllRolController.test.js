import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { RolModel } = db;

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: GetAllRolController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
        await RolModel.create({ nombre: TEST_ROL_NAME });
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe listar los roles incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/rol')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.nombre === TEST_ROL_NAME);
        expect(found).toBeDefined();
    });
}); 