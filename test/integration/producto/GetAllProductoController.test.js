import request from 'supertest';
import { app } from '../../../src/index.js';
import { createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import '../helpers/TestRelations.js';

describe('Integration Test: GetAllProductoController', () => {

    beforeAll(async () => {
        await createProductoTestData(3);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get all productos and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/producto')
            .expect(200);
        console.log(response.body);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(3);
        expect(response.body.count).toBe(3);
    });
});
