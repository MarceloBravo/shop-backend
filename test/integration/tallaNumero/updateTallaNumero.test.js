import request from 'supertest';
import app from '../../appTest.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 42.5;
const TEST_TALLA_LETRA_UPDATED = 40;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: [TEST_TALLA_LETRA, TEST_TALLA_LETRA_UPDATED] }, force: true });
};

describe('Integration Test: UpdateTallaNumero', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        testTallaNumero = await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe actualizar un tallaNumero exitosamente', async () => {
        const response = await request(app)
            .put(`/api/v1/tallaNumero/${testTallaNumero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ valor: TEST_TALLA_LETRA_UPDATED })
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id', testTallaNumero.id);
        expect(response.body.data).toHaveProperty('valor', TEST_TALLA_LETRA_UPDATED);
        expect(response.body.mensaje).toMatch(/actualizado|creado/);
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const response = await request(app)
            .put(`/api/v1/tallaNumero/${testTallaNumero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ valor: '' })
            .expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 