
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import '../helpers/TestRelations.js';

describe('Integration Test: GetAllProductoWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        await createProductoTestData(3);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get all productos including deleted and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/producto/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBe(3);
        expect(response.body.count).toBe(3);
    });
});
