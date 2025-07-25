import request from 'supertest';
import { app } from '../../../src/index.js';
import { RolModel } from '../../../src/models/RolModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_ROL_NAME = 'RolTestIntegracion';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: TEST_ROL_NAME }, force: true });
};

describe('Integration Test: HardDeleteRolController', () => {
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

    it('debe eliminar físicamente un rol', async () => {
        const response = await request(app)
            .delete(`/api/v1/rol/${testRol.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', `${testRol.id}`);
        expect(response.body).toHaveProperty('mensaje');
        // Verifica que el registro ya no existe
        const rol = await RolModel.findByPk(testRol.id, { paranoid: false });
        expect(rol).toBeNull();
    });
}); 