
import request from 'supertest';
import app from '../../appTest.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('SoftDeleteSubCategoriaController Integration', () => {
    let token;
    let categoria;


    beforeAll(async () => {
        token = global.testToken
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    afterEach(async () => {
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should soft delete a subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Soft Delete', categoria_id: categoria.id });

        const response = await request(app)
            .patch(`/api/v1/sub_categoria/${subCategoria.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido borrado exitosamente.');

        // Verify it's soft deleted
        const updatedSubCategoria = await SubCategoriaModel.findByPk(subCategoria.id, { paranoid: false });
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
