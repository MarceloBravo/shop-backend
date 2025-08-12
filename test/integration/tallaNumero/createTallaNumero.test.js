import request from 'supertest';
import { app } from '../../../src/index.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

// Datos de prueba exclusivos para los tests
const TEST_TALLA_LETRA = 42.5;
const TEST_TALLA_LETRA_2 = 40;

// Utilidad para limpiar solo los tallaNumeroes de prueba
const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: [TEST_TALLA_LETRA, TEST_TALLA_LETRA_2] }, force: true });
};

describe('Integration Test: CreateTallaNumero', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe crear un nuevo tallaNumero y retornar respuesta exitosa', async () => {
        const tallaNumeroData = { valor: TEST_TALLA_LETRA };
        const response = await request(app)
            .post('/api/v1/tallaNumero')
            .set('Authorization', `Bearer ${token}`)
            .send(tallaNumeroData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.valor).toBe(`${tallaNumeroData.valor}`);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const invalidData = { valor: '' };
        const response = await request(app)
            .post('/api/v1/tallaNumero')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 