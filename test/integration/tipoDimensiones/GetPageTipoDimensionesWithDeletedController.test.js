import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetPageTipoDimensionesWithDeletedController', () => {
    let token;

    beforeAll(async () => {
        token = global.testToken
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        
        try {
            // Create test data - 15 records
            const testData = Array.from({ length: 15 }, (_, i) => ({
                nombre: `Tipo ${i + 1}`,
                nombre_corto: `T${i + 1}`
            }));
            
            await TipoDimensionesModel.bulkCreate(testData);

            // Soft delete some records
            await TipoDimensionesModel.destroy({
                where: {
                    nombre: ['Tipo 1', 'Tipo 5', 'Tipo 10']
                }
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

    it('should return paginated tipo dimensiones including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/1/5')  // page 1, limit 5
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('rows', 5);
        expect(response.body.data).toHaveProperty('totReg', 15);
        expect(response.body.data).toHaveProperty('pag', 1);
        expect(response.body.data).toHaveProperty('totPag', 3);
        expect(response.body.data.data.length).toBe(5);
    });

    it('should include deleted items in results', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        const deletedItems = response.body.data.data.filter(item => item.deleted_at !== null);
        expect(deletedItems.length).toBeGreaterThan(0);
    });

    it('should return correct page with specified limit', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/2/3')  // page 2, limit 3
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(3);
    });

    it('should return empty array for page beyond available records', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/10/5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(0);
        expect(response.body.data.rows).toBe(0);
        expect(response.body.data.totReg).toBe(15);
    });

    it('should handle invalid page number', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/-1/5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Límite de página o número de página inválido');
    });

    it('should handle invalid limit number', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/page/1/-5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Límite de página o número de página inválido');
    });
});
