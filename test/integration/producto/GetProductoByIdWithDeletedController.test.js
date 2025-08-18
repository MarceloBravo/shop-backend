import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';
import '../helpers/TestRelations.js';

describe('Integration Test: GetProductoByIdWithDeletedController', () => {
    let token;
    let producto;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        producto = await createProductoTestData(1);
        // Soft delete the product
        await ProductoModel.destroy({ where: { id: producto.id } });
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get a producto by ID including deleted and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/producto/deleted/${producto.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('atributos_producto');
        expect(response.body.atributos_producto.length).toBeGreaterThan(0);
        expect(response.body.atributos_producto[0]).toHaveProperty('atributo');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body.nombre).toBe(producto.nombre);
    });

    it('should return 404 if producto is not found (even if deleted)', async () => {
        const response = await request(app)
            .get('/api/v1/producto/deleted/99999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Producto no encontrado');
    });
});
