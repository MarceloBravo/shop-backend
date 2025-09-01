import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { RolModel } = db;

// Datos de prueba exclusivos para los tests
const TEST_ROL_NAME = 'RolTestIntegracion';
const TEST_ROL_NAME_2 = 'RolTestIntegracion2';

// Utilidad para limpiar solo los roles de prueba
const cleanTestRoles = async () => {
    await RolModel.destroy({ where: { nombre: [TEST_ROL_NAME, TEST_ROL_NAME_2] }, force: true });
};

describe('Integration Test: CreateRolController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestRoles();
    });

    afterEach(async () => {
        await cleanTestRoles();
    });

    it('debe crear un nuevo rol y retornar respuesta exitosa', async () => {
        const rolData = { nombre: TEST_ROL_NAME };
        const response = await request(app)
            .post('/api/v1/rol')
            .set('Authorization', `Bearer ${token}`)
            .send(rolData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(rolData.nombre);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const invalidData = { nombre: '' };
        const response = await request(app)
            .post('/api/v1/rol')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 