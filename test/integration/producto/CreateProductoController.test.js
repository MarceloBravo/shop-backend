
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { createRelatedTestDataProducto, destroyRelatedTestDataProducto } from '../helpers/TestAuthHelper.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';

describe('Integration Test: CreateProductoController', () => {
    let token;
    let productoData;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        const relatedData = await createRelatedTestDataProducto();
        productoData = {
            sku: 'SKU1234',
            nombre: 'Producto Test',
            descripcion: 'Descripcion del producto test',
            sub_categoria_id: relatedData.subCategoria.id,
            genero_id: relatedData.genero.id,
            marca_id: relatedData.marca.id,
            precio: 100.00
        };
    });

    afterAll(async () => {
        await destroyRelatedTestDataProducto();
    });

    afterEach(async () => {
        await ProductoModel.destroy({ where: {}, force: true });
    });

    it('should create a new producto and return success response', async () => {
        const response = await request(app)
            .post('/api/v1/producto')
            .set('Authorization', `Bearer ${token}`)
            .send(productoData)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('producto');
        expect(response.body.data.producto).toHaveProperty('id');
        expect(response.body.data.producto.nombre).toBe(productoData.nombre);
        expect(response.body.data.producto.descripcion).toBe(productoData.descripcion);
        expect(response.body.mensaje).toBe('El producto ha sido ingresado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            ...productoData,
            nombre: '', // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .post('/api/v1/producto')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
