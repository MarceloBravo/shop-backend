
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('HardDeleteSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaId;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        // Ensure cleanup even if test fails before deletion
        if (createdSubCategoriaId) {
            await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaId }, force: true });
            createdSubCategoriaId = null;
        }
    });

    test('should hard delete a subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Hard Delete', categoria_id: 1 });
        createdSubCategoriaId = subCategoria.id;

        const response = await request(app)
            .delete(`/api/v1/sub_categoria/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido eliminado exitosamente.');

        // Verify it's actually hard deleted
        const getResponse = await request(app)
            .get(`/api/v1/sub_categoria/deleted/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(getResponse.statusCode).toBe(404);
        createdSubCategoriaId = null; // Mark as deleted for afterEach
    });

    test('should return 500 if subcategory does not exist for hard delete', async () => {
        const nonExistentId = 99999;
        const response = await request(app)
            .delete(`/api/v1/sub_categoria/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Error: Subcategoría no encontrada');
    });
});
