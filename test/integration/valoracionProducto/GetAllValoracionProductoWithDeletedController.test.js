
import request from 'supertest';
import app from '../../appTest.js';
import { createProductoTestData, destroyProductoTestData, createValoracionProductoTestData, createUserAndLogin } from '../helpers/TestAuthHelper.js';


describe('GetAllValoracionProductoWithDeletedController', () => {
    const cantidad = 3;
    let valoraciones = [];
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
        const producto = await createProductoTestData();
        await createValoracionProductoTestData(producto.id, cantidad);
        valoraciones = await createValoracionProductoTestData(producto.id, cantidad, true);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe retornar todas las valoraciones de productos, incluyendo las eliminadas', async () => {
        const response = await request(app)
            .get('/api/v1/valoracion_producto/deleted')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(cantidad*2);
    });
});
