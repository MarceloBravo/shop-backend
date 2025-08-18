
import request from 'supertest';
import { app } from '../../../src/index.js';
import { createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import '../helpers/TestRelations.js';

describe('Integration Test: GetPageProductoController', () => {
    const cantidadProductos = 10;
    const registrosPorPagina = 5;
    let productos = [];

    beforeAll(async () => {
        productos = await createProductoTestData(cantidadProductos);
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get a page of productos and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/producto/page/1/' + registrosPorPagina)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(registrosPorPagina);
        expect(response.body.data.totReg).toBe(cantidadProductos);
    });

    it('should get a filtered page of productos and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/producto/page/1/${registrosPorPagina}/${productos[0].nombre}`)
            .expect(200);
               
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(1);
        expect(response.body.data.rows).toBe(1);
    });
});
