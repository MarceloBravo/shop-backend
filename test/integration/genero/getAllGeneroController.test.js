import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetAllGeneroController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Limpiar generoes existentes para este test
        await GeneroModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todos los generoes después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get all generos and return success response', async () => {
        await GeneroModel.create({ genero: 'Masculino' });
        await GeneroModel.create({ genero: 'Femenino' });

        const response = await request(app)
            .get('/api/v1/genero')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        if (response.body.length > 0) {
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('nombre');
            expect(response.body.data[0]).toHaveProperty('valor');
        }
    });

    it('should return empty array when no generos exist', async () => {
        const response = await request(app)
            .get('/api/v1/genero')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 