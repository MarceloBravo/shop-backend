
import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { SubCategoriaModel, CategoriaModel } = db;


describe('HardDeleteSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaId;
    let categoria;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    afterEach(async () => {
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should hard delete a subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Hard Delete', categoria_id: categoria.id });

        const response = await request(app)
            .delete(`/api/v1/sub_categoria/${subCategoria.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('mensaje', 'El registro ha sido eliminado exitosamente.');

        // Verify it's actually hard deleted
        const getResponse = await request(app)
            .get(`/api/v1/sub_categoria/deleted/${subCategoria.id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(getResponse.statusCode).toBe(404);
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
