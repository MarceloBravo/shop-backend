
import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createRelatedTestDataProducto, destroyRelatedTestDataProducto, createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';
//import '../helpers/TestRelations.js';

describe('Integration Test: UpdateProductoController', () => {
    let token;
    let producto;

    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        producto = await createProductoTestData(1);
    });

    afterEach(async () => {
        await ProductoModel.destroy({ where: {id: producto.id}, force: true });
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should update a producto and return success response', async () => {
        const relatedData = await createRelatedTestDataProducto(false);
        const updatedData = {
            sku: 'SKU1234-2',
            categoria_id: relatedData.categoria.id,
            marca_id: relatedData.marca.id,
            sub_categoria_id: relatedData.subCategoria.id,
            genero_id: relatedData.genero.id,   
            nombre: 'Producto Actualizado',
            descripcion: 'Descripcion actualizada',
            precio: 200.00
        };

        const response = await request(app)
            .put(`/api/v1/producto/${producto.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('actualizados');
        expect(response.body.data.actualizados).toHaveProperty('producto');
        expect(response.body.data.actualizados.producto).toHaveProperty('data');
        expect(response.body.data.actualizados.producto.data).toHaveProperty('nombre');
        expect(response.body.data.actualizados.producto.data.nombre).toBe(updatedData.nombre);
        expect(response.body.data.actualizados.producto.data.descripcion).toBe(updatedData.descripcion);
        expect(parseFloat(response.body.data.actualizados.producto.data.precio)).toBe(updatedData.precio);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });
    
    it('should return 404 if producto is not found for update', async () => {
        const relatedData = await createRelatedTestDataProducto(false);        
        const updatedData = {
            sku: 'SKU1234-3',
            categoria_id: relatedData.categoria.id,
            marca_id: relatedData.marca.id,
            sub_categoria_id: relatedData.subCategoria.id,
            genero_id: relatedData.genero.id,   
            nombre: 'Producto Actualizado',
            descripcion: 'Descripcion actualizada',
            precio: 200.00
        };

        const response = await request(app)
            .put('/api/v1/producto/99999')
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData)
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Producto no encontrado');
    });

    it('should return an error if data is invalid for update', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .put(`/api/v1/producto/${producto.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
