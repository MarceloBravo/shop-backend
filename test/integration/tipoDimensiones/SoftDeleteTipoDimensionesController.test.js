import { app } from '../../../src/index.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('SoftDeleteTipoDimensionesController', () => {
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

    it('should soft delete tipo dimension', async () => {
        const response = await request(app)
            .patch(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verify the record is soft deleted
        const deleted = await TipoDimensionesModel.findByPk(testTipoDimension.id, { paranoid: false });
        expect(deleted.deleted_at).not.toBeNull();
        
        // Verify the record is not returned in normal queries
        const notFound = await TipoDimensionesModel.findByPk(testTipoDimension.id);
        expect(notFound).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .patch('/api/v1/tipo_dimensiones/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it('should return 404 for already deleted item', async () => {
        const response = await request(app)
            .patch(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});
