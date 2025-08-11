
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('GetAllSubCategoriaWithDeletedController Integration', () => {
    let token;
    let createdSubCategoriaIds = [];

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Create some test data, including soft-deleted ones
        const subCategoria1 = await SubCategoriaModel.create({ nombre: 'Test Get All Deleted 1', categoria_id: 1 });
        const subCategoria2 = await SubCategoriaModel.create({ nombre: 'Test Get All Deleted 2', categoria_id: 1 });
        await subCategoria2.destroy(); // Soft delete
        createdSubCategoriaIds.push(subCategoria1.id, subCategoria2.id);
    });

    afterEach(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaIds }, force: true });
        createdSubCategoriaIds = [];
    });

    test('should get all subcategories including deleted', async () => {
        const response = await request(app)
            .get('/api/v1/sub_categoria/deleted')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.length).toBeGreaterThanOrEqual(2);
        const deleted = response.body.data.filter(sub => sub.deleted_at !== null);
        expect(deleted.length).toBeGreaterThan(0);  
    });
});
