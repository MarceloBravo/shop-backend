
import request from 'supertest';
import app from '../../appTest.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('GetByIdSubCategoriaController Integration', () => {
    let token;
    let categoria;

    beforeAll(async () => {
        token = global.testToken;
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    afterEach(async () => {
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should get a subcategory by id', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Get By Id', categoria_id: categoria.id });

        const response = await request(app)
            .get(`/api/v1/sub_categoria/${subCategoria.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', subCategoria.id);
        expect(response.body.nombre).toBe('Test Get By Id');
    });

    test('should return 404 for non-existent subcategory', async () => {
        const nonExistentId = 99999;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Error: Subcategoría no encontrada');
    });
});
