import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TipoDimensionesModel } = db;

describe('GetAllTipoDimensionesWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        
        try {
            // Create test data
            await TipoDimensionesModel.bulkCreate([
                { nombre: 'Peso', nombre_corto: 'Kg' },
                { nombre: 'Volumen', nombre_corto: 'L' },
                { nombre: 'Longitud', nombre_corto: 'M' }
            ]);

            // Soft delete one item
            await TipoDimensionesModel.destroy({
                where: { nombre: 'Peso' }
            });
        } catch (error) {
            console.error('Error setting up test data:', error);
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

    it('should return all tipo dimensiones including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(3);
        
        // Verify deleted item is included
        const deletedItem = response.body.data.find(item => item.nombre === 'Peso');
        expect(deletedItem).toBeTruthy();
        expect(deletedItem.deleted_at).not.toBeNull();

        // Verify non-deleted items
        const activeItems = response.body.data.filter(item => !item.deleted_at);
        expect(activeItems.length).toBe(2);
    });

    it('should include deletion information', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted')
            .set('Authorization', `Bearer ${token}`);
            
        const deletedItem = response.body.data.find(item => item.deleted_at !== null);
        expect(deletedItem).toBeTruthy();
        expect(new Date(deletedItem.deleted_at)).toBeInstanceOf(Date);
    });
});
