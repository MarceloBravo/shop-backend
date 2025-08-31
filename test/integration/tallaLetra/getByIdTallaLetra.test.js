import request from 'supertest';
import app from '../../appTest.js';
import { TallaLetraModel } from '../../../src/models/TallaLetraModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetByIdTallaLetra', () => {
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

    it('debe obtener un tallaLetra por id', async () => {
        const response = await request(app)
            .get(`/api/v1/tallaLetra/${testTallaLetra.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', testTallaLetra.id);
        expect(response.body).toHaveProperty('valor', TEST_TALLA_LETRA);
    });

    it('debe retornar error si el tallaLetra no existe', async () => {
        const response = await request(app)
            .get('/api/v1/tallaLetra/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 