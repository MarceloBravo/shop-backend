
import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData, createValoracionProductoTestData } from '../helpers/TestAuthHelper.js';

describe('GetPageValoracionProductoWithDeletedController', () => {
    const cantidad = 3;
    let valoracion;
    let token;
    
    beforeAll(async () => {
        token = global.testToken
        const producto = await createProductoTestData();
        valoracion = await createValoracionProductoTestData(producto.id, cantidad);
        const eliminados = await createValoracionProductoTestData(producto.id, cantidad, true);
        valoracion = [...valoracion, ...eliminados];
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });


    it('debe retornar una página de valoraciones de productos, incluyendo las eliminadas', async () => {
        const response = await request(app)
            .get('/api/v1/valoracion_producto/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('pag');
        expect(response.body.data).toHaveProperty('totPag');
    });
});
