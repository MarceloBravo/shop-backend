
import request from 'supertest';
import app from '../../appTest.js';
import { createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
//import '../helpers/TestRelations.js';

describe('Integration Test: GetProductoByIdController', () => {
    let producto;

    beforeAll(async () => {
        producto = await createProductoTestData(1);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get a producto by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/producto/${producto.id}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('atributos_producto');
        expect(response.body.atributos_producto.length).toBeGreaterThan(0);
        expect(response.body.atributos_producto[0]).toHaveProperty('atributo');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body.nombre).toBe(producto.nombre);
    });

    it('should return 404 if producto is not found', async () => {
        const response = await request(app)
            .get('/api/v1/producto/99999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Producto no encontrado');
    });
});
