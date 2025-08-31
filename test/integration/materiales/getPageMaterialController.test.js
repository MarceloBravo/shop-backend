import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: GetPageMaterialController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunas materials de prueba antes de cada test
        await MaterialModel.bulkCreate([
            { valor: 'Lana' },
            { valor: 'Cuero' },
            { valor: 'Plástico' },
        ]);
    });

    afterEach(async () => {
        // Limpiar las materials de prueba después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get a page of materials and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/page/1/3')
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('pag');
        expect(response.body.data).toHaveProperty('totPag');
        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        expect(response.body.data.rows).toBe(3);
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.totPag).toBeGreaterThan(0);
    });

    it('should get second page of materials', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/page/2/2')
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(1);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/page/1')
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no materials exist', async () => {
        // Limpiar todas las materials
        await MaterialModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/materiales/page/1/10')
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 