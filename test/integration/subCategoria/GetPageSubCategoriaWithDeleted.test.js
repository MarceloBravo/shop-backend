
import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';

const { SubCategoriaModel, CategoriaModel } = db;

describe('GetPageSubCategoriaWithDeletedController Integration', () => {
    let token;
    let categoria;

    beforeAll(async () => {
        token = await createUserAndLogin();;
        await SubCategoriaModel.destroy({ where: {}, force: true });
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
   
        // Create some test data, including soft-deleted ones
        for (let i = 0; i < 15; i++) {
            const subCategoria = await SubCategoriaModel.create({ nombre: `Test Page Deleted ${i}`, categoria_id: categoria.id });
            if (i % 2 === 0) {
                await subCategoria.destroy(); // Soft delete even ones
            }
        }
    });

    afterAll(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should get a page of subcategories including deleted with default limit', async () => {
        const page = 1;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/deleted/page/${page}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(10); // Default limit is 10
        expect(response.body.data.pag).toBe(page);
        // Check if soft deleted items are present
        expect(response.body.data.data.some(sub => sub.deletedAt !== null)).toBe(true);
    });

    test('should get a page of subcategories including deleted with custom limit', async () => {
        const page = 1;
        const limit = 5;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/deleted/page/${page}/${limit}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(5); // Default limit is 10
        expect(response.body.data.pag).toBe(page);
        // Check if soft deleted items are present
        expect(response.body.data.data.some(sub => sub.deletedAt !== null)).toBe(true);
    });

    test('should return empty array for out of bounds page', async () => {
        const page = 999;
        const limit = 10;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/deleted/page/${page}/${limit}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.body.data.data.length).toBe(0);
    });
});
