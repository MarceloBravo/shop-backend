import { app } from '../../../src/index.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { TipoDimensionesModel } from '../../../src/models/TipoDimensionesModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('UpdateTipoDimensionesController', () => {
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

    it('should update tipo dimension', async () => {
        const updateData = {
            nombre: 'Peso Modificado',
            nombre_corto: 'KgM'
        };

        const response = await request(app)
            .put(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id', testTipoDimension.id);
        expect(response.body.data).toHaveProperty('nombre', updateData.nombre);
        expect(response.body.data).toHaveProperty('nombre_corto', updateData.nombre_corto);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');

        // Verify in database
        const updated = await TipoDimensionesModel.findByPk(testTipoDimension.id);
        expect(updated.nombre).toBe(updateData.nombre);
        expect(updated.nombre_corto).toBe(updateData.nombre_corto);
    });

    it('should return 200 for non-existent id and create a new tipo dimension record', async () => {
        const response = await request(app)
            .put('/api/v1/tipo_dimensiones/999999')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Test',
                nombre_corto: 'Tst'
            });
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('nombre', 'Test');
        expect(response.body.data).toHaveProperty('nombre_corto', 'Tst');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');
    });

    it('should return error when nombre is missing', async () => {
        const response = await request(app)
            .put(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre_corto: 'Tst'
            });
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details[0]).toBe('El campo nombre es obligatorio y debe tener un máximo de hasta 30 carácteres.');
    });

    it('should return error when nombre_corto is missing', async () => {
        const response = await request(app)
            .put(`/api/v1/tipo_dimensiones/${testTipoDimension.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nombre: 'Test'
            });
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details[0]).toBe('El campo nombre_corto es obligatorio y debe tener un máximo de hasta 10 carácteres.');
    });
});
