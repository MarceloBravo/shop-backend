
import request from 'supertest';
import app from '../../appTest.js';
import { createProductoTestData, destroyProductoTestData, createValoracionProductoTestData, createUserAndLogin } from '../helpers/TestAuthHelper.js';

describe('GetPageValoracionProductoController', () => {
    const cantidad = 3;
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id, cantidad);
        const eliminado = await createValoracionProductoTestData(producto.id, 1, true);
        valoracion = [...valoracion, eliminado];
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe retornar una página de valoraciones de productos', async () => {
        const response = await request(app).get('/api/v1/valoracion_producto/page/1/10');
        
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg', cantidad);
        expect(response.body.data).toHaveProperty('rows',cantidad);
        expect(response.body.data).toHaveProperty('pag', 1);
        expect(response.body.data).toHaveProperty('totPag', 1);
    });
});
