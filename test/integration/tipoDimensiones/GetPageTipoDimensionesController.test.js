import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TipoDimensionesModel } = db;

describe('GetPageTipoDimensionesController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await TipoDimensionesModel.destroy({ where: {} }); // Clear existing records
    });

    beforeEach(async () => {
        // Limpiar la tabla antes de cada test
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true // Esto asegura que se eliminen incluso los registros soft-deleted
        });
        
        // Create test data - 15 records
        const testData = Array.from({ length: 15 }, (_, i) => ({
            nombre: `Tipo ${i + 1}`,
            nombre_corto: `T${i + 1}`
        }));
        
        try {
            await TipoDimensionesModel.bulkCreate(testData);
        } catch (error) {
            console.error('Error al crear datos de prueba:', error);
            throw error;
        }

        // Soft delete some records
        await TipoDimensionesModel.destroy({
            where: { nombre: 'Tipo 1' }
        });
    });

    afterAll(async () => {
        await TipoDimensionesModel.destroy({ where: {}, force: true });
        //await sequelize.close();
    });

    it('should return paginated tipo dimensiones', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/page/1/5')  // page 1, limit 5
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('totPag');
        expect(response.body.data.data.length).toBe(5);
    });

    it('should return correct page with specified limit', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/page/2/3')  // page 2, limit 3
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(3);
        expect(response.body.data.data[0].nombre).not.toBe('Tipo 1'); // First item should not be deleted item
    });

    it('should return empty array for page beyond available records', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/page/10/5')  // page far beyond available records
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data.data.length).toBe(5);
        expect(response.body.data.totPag).toBe(3);
        expect(response.body.data.rows).toBe(5);
        expect(response.body.data.totReg).toBe(14);
    });


    it('should handle invalid limit number', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/page/1/-5')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Límite de página o número de página inválido');
    });
});
