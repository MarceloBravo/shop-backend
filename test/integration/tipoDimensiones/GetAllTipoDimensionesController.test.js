import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetAllTipoDimensionesController', () => {
    let token;

    beforeAll(async () => {
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        token = global.testToken
        
        try {
            // Create test data
            await TipoDimensionesModel.bulkCreate([
                { nombre: 'Peso', nombre_corto: 'Kg' },
                { nombre: 'Volumen', nombre_corto: 'L' },
                { nombre: 'Longitud', nombre_corto: 'M' }
            ]);
        } catch (error) {
            console.error('Error creating test data:', error);
            throw error;
        }
    });
    
    afterAll(async () => {
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        //await sequelize.close();
    });
    
    it('should return all tipo dimensiones', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(3);
        
        const firstItem = response.body.data[0];
        expect(firstItem).toHaveProperty('id');
        expect(firstItem).toHaveProperty('nombre');
        expect(firstItem).toHaveProperty('nombre_corto');
    });

    it('should not return soft deleted items', async () => {
        // Soft delete one item
        await TipoDimensionesModel.destroy({
            where: { nombre: 'Peso' },
            force: true
        });

        const response = await request(app)
            .get('/api/v1/tipo_dimensiones')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
        expect(response.body.data.find(item => item.nombre === 'Peso')).toBeUndefined();
    });
});
