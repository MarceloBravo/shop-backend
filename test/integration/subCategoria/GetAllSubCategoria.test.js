
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('GetAllSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaIds = [];

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Create some test data
        const subCategoria1 = await SubCategoriaModel.create({ nombre: 'Test Get All 1', categoria_id: 1 });
        const subCategoria2 = await SubCategoriaModel.create({ nombre: 'Test Get All 2', categoria_id: 1 });
        createdSubCategoriaIds.push(subCategoria1.id, subCategoria2.id);
    });

    afterEach(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaIds }, force: true });
        createdSubCategoriaIds = [];
    });

    test('should get all subcategories', async () => {
        const response = await request(app)
            .get('/api/v1/sub_categoria')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBeGreaterThanOrEqual(2);
        const deleted = response.body.data.filter(sub => sub.deleted_at !== null);
        expect(deleted.length).toBe(0); 
    });
});
