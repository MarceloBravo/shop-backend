import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { TipoDimensionesModel } = db;

describe('GetByIdTipoDimensionesWithDeletedController', () => {
    let testTipoDimension;
    let deletedTipoDimension;
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
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

            deletedTipoDimension = await TipoDimensionesModel.create({
                nombre: 'Volumen',
                nombre_corto: 'L'
            });

            // Soft delete one item
            await TipoDimensionesModel.destroy({
                where: { id: deletedTipoDimension.id }
            });
        } catch (error) {
            console.error('Error setting up test data:', error);
            throw error;
        };
    });

    afterAll(async () => {
        await TipoDimensionesModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        //await sequelize.close();
    });

    it('should return non-deleted tipo dimension by id', async () => {
        const response = await request(app)
            .get(`/api/v1/tipo_dimensiones/deleted/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', testTipoDimension.id);
        expect(response.body).toHaveProperty('nombre', 'Peso');
        expect(response.body).toHaveProperty('nombre_corto', 'Kg');
        expect(response.body.deleted_at).toBeNull();
    });

    it('should return deleted tipo dimension by id', async () => {
        const response = await request(app)
            .get(`/api/v1/tipo_dimensiones/deleted/${deletedTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', deletedTipoDimension.id);
        expect(response.body).toHaveProperty('nombre', 'Volumen');
        expect(response.body).toHaveProperty('nombre_corto', 'L');
        expect(response.body.deleted_at).not.toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .get('/api/v1/tipo_dimensiones/deleted/999999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: Registro no encontrado');
    });
});
