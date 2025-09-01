
import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { SubCategoriaModel, CategoriaModel } = db;

describe('GetPageSubCategoriaController Integration', () => {
    let token;
    let categoria;

    beforeAll(async () => {
        token = await createUserAndLogin();;
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    beforeEach(async () => {
        // Create some test data
        for (let i = 0; i < 15; i++) {
            const subCategoria = await SubCategoriaModel.create({ nombre: `Test Page ${i}`, categoria_id: categoria.id });
        }
    });

    afterEach(async () => {
        // Clean up test data
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should get a page of subcategories with default limit', async () => {
        const page = 1;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/page/${page}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(10); // Default limit is 10
        expect(response.body.data.pag).toBe(page);
    });

    test('should get a page of subcategories with custom limit', async () => {
        const page = 1;
        const limit = 5;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/page/${page}/${limit}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(limit);
        expect(response.body.data.pag).toBe(page);
    });

    test('should return empty array for out of bounds page', async () => {
        const page = 999;
        const limit = 10;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/page/${page}/${limit}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.data.length).toBe(0);
    });
});
