import { app } from '../../../src/index.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetByIdTipoDimensionesController', () => {
    let testTipoDimension;
    let token;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        
        try {
            // Create test data
            testTipoDimension = await TipoDimensionesModel.create({
                nombre: 'Peso',
                nombre_corto: 'Kg'
            });
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
        await sequelize.close();
    });

    it('should return tipo dimension by id', async () => {
        const response = await request(app)
            .get(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', testTipoDimension.id);
        expect(response.body).toHaveProperty('nombre', 'Peso');
        expect(response.body).toHaveProperty('nombre_corto', 'Kg');
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: Registro no encontrado');
    });

    it('should return 404 for soft deleted item', async () => {
        await TipoDimensionesModel.destroy({
            where: { id: testTipoDimension.id },
            force: true
        });

        const response = await request(app)
            .get(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: Registro no encontrado');
    });
});
