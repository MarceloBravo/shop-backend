import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('HardDeleteTipoDimensionesController', () => {
    let testTipoDimension;
    let token;

    beforeAll(async () => {
        token = global.testToken
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

            // Soft delete the record
            await TipoDimensionesModel.destroy({
                where: { id: testTipoDimension.id }
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

    it('should hard delete tipo dimension', async () => {
        const response = await request(app)
            .delete(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido eliminado exitosamente.');

        // Verify the record is completely deleted
        const deleted = await TipoDimensionesModel.findByPk(testTipoDimension.id, { paranoid: false });
        expect(deleted).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .delete('/api/v1/tipo_dimensiones/999999/hard');

        expect(response.status).toBe(404);
    });

    it('should not hard delete non-soft-deleted item', async () => {
        // Create a new record that is not soft deleted
        const newTipoDimension = await TipoDimensionesModel.create({
            nombre: 'Volumen',
            nombre_corto: 'L'
        });

        const response = await request(app)
            .delete(`/api/v1/tipo_dimensiones/${newTipoDimension.id}/hard`);

        expect(response.status).toBe(404);
    });
});
