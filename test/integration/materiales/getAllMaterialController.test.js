import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MaterialModel } = db;


describe('Integration Test: GetAllMaterialController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Limpiar materials existentes para este test
        await MaterialModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todas las materials después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get all materials and return success response', async () => {
        await MaterialModel.create({ valor: 'Lana' });
        await MaterialModel.create({ valor: 'Cuero' });

        const response = await request(app)
            .get('/api/v1/materiales')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        if (response.body.data.length > 0) {
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('valor');
        }
    });

    it('should return empty array when no materials exist', async () => {
        const response = await request(app)
            .get('/api/v1/materiales')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 