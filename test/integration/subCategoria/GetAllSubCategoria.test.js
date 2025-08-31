
import request from 'supertest';
import app from '../../appTest.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('GetAllSubCategoriaController Integration', () => {
    let token;
    let categoria;

    beforeAll(async () => {
        token = global.testToken;
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    beforeEach(async () => {
        // Create some test data
        const subCategoria1 = await SubCategoriaModel.create({ nombre: 'Test Get All 1', categoria_id: categoria.id });
        const subCategoria2 = await SubCategoriaModel.create({ nombre: 'Test Get All 2', categoria_id: categoria.id });
    });

    afterEach(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: {}, force: true });
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
