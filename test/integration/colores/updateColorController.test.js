import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: UpdateColorController', () => {
    let token;
    let testColor;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un color de prueba antes de cada test
        testColor = await ColorModel.create({
            nombre: 'Test Color',
            valor: '#TEST00'
        });
    });

    afterEach(async () => {
        // Limpiar el color de prueba después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should update an existing color and return success response', async () => {
        const updateData = {
            nombre: 'Updated Color',
            valor: '#UPDATED'
        };

        const response = await request(app)
            .put(`/api/v1/color/${testColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
        //console.log('-------------------',response.body);
        expect(response.body).toHaveProperty('color');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.color.nombre).toBe(updateData.nombre);
        expect(response.body.color.valor).toBe(updateData.valor);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new color when ID does not exist', async () => {
        const newColorData = {
            nombre: 'New Color',
            valor: '#NEWCOLOR'
        };

        const response = await request(app)
            .put('/api/v1/color/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newColorData)
            .expect(200);

        expect(response.body).toHaveProperty('color');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.color.nombre).toBe(newColorData.nombre);
        expect(response.body.color.valor).toBe(newColorData.valor);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar el color creado
        await ColorModel.destroy({ where: { id: response.body.color.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            valor: ''
        };

        const response = await request(app)
            .put(`/api/v1/color/${testColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 