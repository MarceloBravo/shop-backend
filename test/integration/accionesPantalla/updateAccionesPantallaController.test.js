import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { createTestRecords, recordData } from './constantes.js';

describe('Integration Test: UpdateAccionesPantallaController', () => {
    let token;
    let testColor;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un color de prueba antes de cada test
        const record = await createTestRecords(PantallaModel, AccionesPantallaModel, 5);   
        testColor = record[0].toJSON(); // Convertir a objeto plano
    });

    afterEach(async () => {
        // Limpiar el color de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should update an existing record and return success response', async () => {
        const id = testColor.id;
        const updateData = testColor;
        delete updateData.id;
        updateData.permite_crear = false;
        const response = await request(app)
            .put(`/api/v1/acciones_pantalla/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.permite_crear).toBe(updateData.permite_crear);
        expect(response.body.data.permite_eliminar).toBe(updateData.permite_eliminar);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new record when ID does not exist', async () => {
        const newColorData = testColor;
        delete newColorData.id;
        const response = await request(app)
            .put('/api/v1/acciones_pantalla/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newColorData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.permite_crear).toBe(newColorData.permite_crear);
        expect(response.body.data.permite_eliminar).toBe(newColorData.permite_eliminar);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar el color creado
        await AccionesPantallaModel.destroy({ where: {}, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = testColor;
        invalidData.pantalla_id = null;

        const response = await request(app)
            .put(`/api/v1/acciones_pantalla/${invalidData.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 