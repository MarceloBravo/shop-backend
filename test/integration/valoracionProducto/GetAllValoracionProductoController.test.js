
import request from 'supertest';
import app from '../../appTest.js';
import { ValoracionProductoModel } from '../../../src/models/ValoracionProductoModel.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData, createValoracionProductoTestData } from '../helpers/TestAuthHelper.js';

describe('GetAllValoracionProductoController', () => {
    const cantidad = 3;
    let valoraciones = [];
    let token;
    
    beforeAll(async () => {
        token = global.testToken
        const producto = await createProductoTestData();
        valoraciones = await createValoracionProductoTestData(producto.id, cantidad);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('debe retornar todas las valoraciones de productos', async () => {
        const response = await request(app)
                .get('/api/v1/valoracion_producto')
                .set('Authorization', `Bearer ${token}`);
                
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(cantidad);
    });


    it('debe retornar todas las valoraciones de productos menos los marcados como eliminados', async () => {
        await ValoracionProductoModel.destroy({ where: { id: valoraciones[0].id } });
        const response = await request(app)
                .get('/api/v1/valoracion_producto')
                .set('Authorization', `Bearer ${token}`);
                
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(cantidad-1);
    });
});
