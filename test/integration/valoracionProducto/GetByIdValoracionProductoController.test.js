
import request from 'supertest';
import app from '../../appTest.js';
import { createProductoTestData, destroyProductoTestData, createValoracionProductoTestData, createUserAndLogin } from '../helpers/TestAuthHelper.js';

describe('GetByIdValoracionProductoController', () => {
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });


    it('debe retornar una valoración de producto por su id', async () => {
        const response = await request(app).get('/api/v1/valoracion_producto/' + valoracion.id);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', valoracion.id);
    });

    it('debe retornar un error si la valoración no existe', async () => {
        const response = await request(app).get('/api/v1/valoracion_producto/999');
        
        expect(response.status).toBe(404);
        expect(response.body.code).toBe(404);
        expect(response.body.error).toBe('Error: Valoración no encontrada');
    });
});
