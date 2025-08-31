
import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData, createValoracionProductoTestData } from '../helpers/TestAuthHelper.js';

describe('GetByIdValoracionProductoWithDeletedController', () => {
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = global.testToken
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id, 1, true);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe retornar una valoración de producto por su id, incluyendo las eliminadas', async () => {
        const response = await request(app)
            .get('/api/v1/valoracion_producto/deleted/'+ valoracion.id)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', valoracion.id);
        expect(response.body).toHaveProperty('deleted_at');
        expect(response.body.deleted_at).not.toBeNull();
        expect(response.body).toHaveProperty('producto_id', valoracion.producto_id);
        expect(response.body).toHaveProperty('estrellas', valoracion.estrellas);
        expect(response.body).toHaveProperty('comentario', valoracion.comentario);
    });

    it('debe retornar un error si la valoración no existe', async () => {
        const response = await request(app)
            .get('/api/v1/valoracion_producto/deleted/999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});
