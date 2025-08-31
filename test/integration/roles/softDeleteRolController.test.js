import request from 'supertest';
import app from '../../appTest.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: SoftDeleteRolController', () => {
    let token;
    let testRol;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        await cleanTestRoles();
        testRol = await RolModel.create({ nombre: TEST_ROL_NAME });
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe eliminar lógicamente un rol', async () => {
        const response = await request(app)
            .patch(`/api/v1/rol/${testRol.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body).toHaveProperty('code', true);
        expect(response.body).toHaveProperty('mensaje');
        // Verifica que el registro sigue existiendo pero con deleted_at no nulo
        const rol = await RolModel.findByPk(testRol.id, { paranoid: false });
        expect(rol).not.toBeNull();
        expect(rol.deleted_at).not.toBeNull();
    });
}); 