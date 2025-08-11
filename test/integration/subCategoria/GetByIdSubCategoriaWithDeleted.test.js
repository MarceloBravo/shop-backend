
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('GetByIdSubCategoriaWithDeletedController Integration', () => {
    let token;
    let createdSubCategoriaId;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        if (createdSubCategoriaId) {
            await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaId }, force: true });
            createdSubCategoriaId = null;
        }
    });

    test('should get a soft deleted subcategory by id', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Get By Id Deleted', categoria_id: 1 });
        await subCategoria.destroy(); // Soft delete
        createdSubCategoriaId = subCategoria.id;

        const response = await request(app)
            .get(`/api/v1/sub_categoria/deleted/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', createdSubCategoriaId);
        expect(response.body.nombre).toBe('Test Get By Id Deleted');
        expect(response.body).toHaveProperty('deleted_at');
        expect(response.body.deletedAt).not.toBeNull();
    });

    test('should return 404 for non-existent subcategory', async () => {
        const nonExistentId = 99999;
        const response = await request(app)
            .get(`/api/v1/sub_categoria/deleted/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Error: Subcategoría no encontrada');
    });
});
