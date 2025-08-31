import request from 'supertest';
import app from '../../appTest.js';
import { TallaLetraModel } from '../../../src/models/TallaLetraModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 'M';
const TEST_TALLA_LETRA_UPDATED = 'L';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: [TEST_TALLA_LETRA, TEST_TALLA_LETRA_UPDATED] }, force: true });
};

describe('Integration Test: UpdateTallaLetra', () => {
    let token;
    let testTallaLetra;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        await cleanTestTallaLetraes();
        testTallaLetra = await TallaLetraModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe actualizar un tallaLetra exitosamente', async () => {
        const response = await request(app)
            .put(`/api/v1/tallaLetra/${testTallaLetra.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ valor: TEST_TALLA_LETRA_UPDATED })
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id', testTallaLetra.id);
        expect(response.body.data).toHaveProperty('valor', TEST_TALLA_LETRA_UPDATED);
        expect(response.body.mensaje).toMatch(/actualizado|creado/);
    });

    it('debe retornar error si los datos son inválidos', async () => {
        const response = await request(app)
            .put(`/api/v1/tallaLetra/${testTallaLetra.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ valor: '' })
            .expect(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 