import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { RolModel } = db;

const TEST_ROL_NAME = 'RolTestIntegracion';
const TEST_ROL_NAME_UPDATED = 'RolTestIntegracionActualizado';

const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: [TEST_ROL_NAME, TEST_ROL_NAME_UPDATED] }, force: true });
};

describe('Integration Test: UpdateRolController', () => {
    let token;
    let testRol;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
        testRol = await RolModel.create({ nombre: TEST_ROL_NAME });
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe actualizar un rol exitosamente', async () => {
        const response = await request(app)
            .put(`/api/v1/rol/${testRol.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nombre: TEST_ROL_NAME_UPDATED })
            .expect(200);

        expect(response.body).toHaveProperty('rol');
        expect(response.body.rol).toHaveProperty('id', testRol.id);
        expect(response.body.rol).toHaveProperty('nombre', TEST_ROL_NAME_UPDATED);
        expect(response.body.mensaje).toMatch(/actualizado|creado/);
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const response = await request(app)
            .put(`/api/v1/rol/${testRol.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nombre: '' })
            .expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 