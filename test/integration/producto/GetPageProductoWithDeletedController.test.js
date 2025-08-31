import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper, createProductoTestData, destroyProductoTestData } from '../helpers/TestAuthHelper.js';
import { ProductoModel } from '../../../src/models/ProductoModel.js';
//import '../helpers/TestRelations.js';

describe('Integration Test: GetPageProductoWithDeletedController', () => {
    const cantidadProductos = 10;
    const registrosPorPagina = 5;
    let token;
    let productos = [];

    beforeAll(async () => {
        token = global.testToken
        productos = await createProductoTestData(10);
        // Soft delete one product
        await ProductoModel.destroy({ where: { id: productos[0].id } });
        await ProductoModel.destroy({ where: { id: productos[1].id } });
    });

    afterAll(async () => {
        await destroyProductoTestData();
    });

    it('should get a page of productos including deleted and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/producto/deleted/page/1/' + registrosPorPagina)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(registrosPorPagina);
        expect(response.body.data.totReg).toBe(cantidadProductos);
    });

    it('should get a filtered page of productos including deleted and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/producto/deleted/page/1/${registrosPorPagina}/${productos[0].nombre}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data.data.length).toBe(1);
        expect(response.body.data.totReg).toBe(1);
    });
});
