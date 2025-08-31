import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';

describe('Integration Test: UpdateAtributoController', () => {
    let token;
    let testAtributo;
    const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un atributo de prueba antes de cada test
        testAtributo = await AtributosModel.create(atributoData);
    });

    afterEach(async () => {
        // Limpiar el atributo de prueba después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should update an existing atributo and return success response', async () => {
        const updateData = {
            nombre: 'Updated Atributo',
            valor_string: '#UPDATED',
            valor_numerico: null,
        };

        const response = await request(app)
            .put(`/api/v1/atributo/${testAtributo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
            
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.nombre).toBe(updateData.nombre);
        expect(response.body.data.valor_string).toBe(updateData.valor_string);
        expect(response.body.data.valor_numerico).toBe(updateData.valor_numerico);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new atributo when ID does not exist', async () => {
        const newAtributoData = {
            nombre: 'New Atributo',
            valor_string: '#NEWCOLOR',
            valor_numerico: 10
        };

        const response = await request(app)
            .put('/api/v1/atributo/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newAtributoData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.nombre).toBe(newAtributoData.nombre);
        expect(response.body.data.valor_string).toBe(newAtributoData.valor_string);
        expect(parseFloat(response.body.data.valor_numerico)).toBe(newAtributoData.valor_numerico);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar el atributo creado
        await AtributosModel.destroy({ where: { id: response.body.data.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            valor: ''
        };

        const response = await request(app)
            .put(`/api/v1/atributo/${testAtributo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 