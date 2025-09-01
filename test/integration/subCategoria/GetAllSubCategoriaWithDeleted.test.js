
import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { SubCategoriaModel, CategoriaModel } = db;

describe('GetAllSubCategoriaWithDeletedController Integration', () => {
    let token;
    let categoria;

    beforeAll(async () => {
        token = await createUserAndLogin();;
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    beforeEach(async () => {
        // Create some test data, including soft-deleted ones
        const subCategoria1 = await SubCategoriaModel.create({ nombre: 'Test Get All Deleted 1', categoria_id: categoria.id });
        const subCategoria2 = await SubCategoriaModel.create({ nombre: 'Test Get All Deleted 2', categoria_id: categoria.id });
        await subCategoria2.destroy(); // Soft delete
    });

    afterEach(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: {}, force: true });
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
