import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: GetByIdRolController', () => {
    let token;
    let testRol;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
        testRol = await RolModel.create({ nombre: TEST_ROL_NAME });
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe obtener un rol por id', async () => {
        const response = await request(app)
            .get(`/api/v1/rol/${testRol.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', testRol.id);
        expect(response.body).toHaveProperty('nombre', TEST_ROL_NAME);
    });

    it('debe retornar error si el rol no existe', async () => {
        const response = await request(app)
            .get('/api/v1/rol/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(500);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Rol no encontrado');
    });
}); 