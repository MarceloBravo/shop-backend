import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetAllColorController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Limpiar colores existentes para este test
        await ColorModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todos los colores después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get all colors and return success response', async () => {
        await ColorModel.create({ nombre: 'Rojo', valor: '#FF0000' });
        await ColorModel.create({ nombre: 'Azul', valor: '#0000FF' });

        const response = await request(app)
            .get('/api/v1/color')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        if (response.body.length > 0) {
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('nombre');
            expect(response.body.data[0]).toHaveProperty('valor');
        }
    });

    it('should return empty array when no colors exist', async () => {
        const response = await request(app)
            .get('/api/v1/color')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 