
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('SoftDeleteSubCategoriaController Integration', () => {
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

    test('should soft delete a subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Soft Delete', categoria_id: 1 });
        createdSubCategoriaId = subCategoria.id;

        const response = await request(app)
            .patch(`/api/v1/sub_categoria/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido borrado exitosamente.');

        // Verify it's soft deleted
        const updatedSubCategoria = await SubCategoriaModel.findByPk(createdSubCategoriaId, { paranoid: false });
        expect(updatedSubCategoria).not.toBeNull();
        expect(updatedSubCategoria.deletedAt).not.toBeNull();
    });

    test('should return 500 if subcategory does not exist for soft delete', async () => {
        const nonExistentId = 99999;
        const response = await request(app)
            .patch(`/api/v1/sub_categoria/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Error: Subcategoría no encontrada');
    });
});
