
import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';

describe('Integration Test: SoftDeleteProductoController', () => {
    let token;
    let producto;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        producto = await createProductoTestData(1);
    });

    afterEach(async () => {
        await destroyProductoTestData();
    });

    it('should soft delete a producto and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/producto/${producto.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        const deletedProducto = await ProductoModel.findByPk(producto.id, { paranoid: false });
        expect(deletedProducto).not.toBeNull();
        expect(deletedProducto.deleted_at).not.toBeNull();
    });

    it('should return 404 if producto is not found for soft delete', async () => {
        const response = await request(app)
            .patch('/api/v1/producto/99999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Producto no encontrado');
    });
});
