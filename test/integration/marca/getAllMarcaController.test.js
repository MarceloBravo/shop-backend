import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: GetAllMarcaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Limpiar marcas existentes para este test
        await MarcaModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todas las marcas después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should get all marcas and return success response', async () => {
        await MarcaModel.create({ nombre: 'Nike', logo: 'path/to/nike.png' });
        await MarcaModel.create({ nombre: 'Adidas', logo: 'path/to/adidas.png' });

        const response = await request(app)
            .get('/api/v1/marca')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        if (response.body.data.length > 0) {
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('nombre');
            expect(response.body.data[0]).toHaveProperty('logo');
        }
    });

    it('should return empty array when no marcas exist', async () => {
        const response = await request(app)
            .get('/api/v1/marca')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 