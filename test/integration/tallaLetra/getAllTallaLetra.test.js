import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TallaLetraModel } = db;

const TEST_TALLA_LETRA = 'M';

const cleanTestTallaLetraes = async () => {
    await TallaLetraModel.destroy({ where: { valor: TEST_TALLA_LETRA }, force: true });
};

describe('Integration Test: GetAllTallaLetra', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await cleanTestTallaLetraes();
        await TallaLetraModel.create({ valor: TEST_TALLA_LETRA });
    });

    afterEach(async () => {
        await cleanTestTallaLetraes();
    });

    it('debe listar los registros incluyendo el de prueba', async () => {
        const response = await request(app)
            .get('/api/v1/tallaLetra')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        const found = response.body.data.find(r => r.valor === TEST_TALLA_LETRA);
        expect(found).toBeDefined();
    });
}); 