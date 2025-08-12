import request from 'supertest';
import { app } from '../../../src/index.js';
import { TallaNumericaModel } from '../../../src/models/TallaNumericaModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

const TEST_TALLA_LETRA = 42.5;

const cleanTestTallaNumeroes = async () => {
    await TallaNumericaModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetByIdTallaNumero', () => {
    let token;
    let testTallaNumero;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaNumeroes();
        testTallaNumero = await TallaNumericaModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaNumeroes();
    });

    it('debe obtener un tallaNumero por id', async () => {
        const response = await request(app)
            .get(`/api/v1/tallaNumero/${testTallaNumero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', testTallaNumero.id);
        expect(response.body).toHaveProperty('valor',  `${TEST_TALLA_LETRA}`);
    });

    it('debe retornar error si el tallaNumero no existe', async () => {
        const response = await request(app)
            .get('/api/v1/tallaNumero/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 