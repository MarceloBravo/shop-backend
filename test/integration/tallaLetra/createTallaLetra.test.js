import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaLetraModel } = db;


// Datos de prueba exclusivos para los tests
const TEST_TALLA_LETRA = 'M';
const TEST_TALLA_LETRA_2 = 'L';

// Utilidad para limpiar solo los tallaLetraes de prueba
const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: [TEST_TALLA_LETRA, TEST_TALLA_LETRA_2] }, force: true });
};

describe('Integration Test: CreateTallaLetra', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaLetraes();
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe crear un nuevo tallaLetra y retornar respuesta exitosa', async () => {
        const tallaLetraData = { valor: TEST_TALLA_LETRA };
        const response = await request(app)
            .post('/api/v1/tallaLetra')
            .set('Authorization', `Bearer ${token}`)
            .send(tallaLetraData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.valor).toBe(tallaLetraData.valor);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const invalidData = { valor: '' };
        const response = await request(app)
            .post('/api/v1/tallaLetra')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 