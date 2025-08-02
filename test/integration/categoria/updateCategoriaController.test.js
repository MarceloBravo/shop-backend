import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: UpdateCategoriaController', () => {
    let token;
    let testCategoria;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un categoria de prueba antes de cada test
        testCategoria = await CategoriaModel.create({
            nombre: 'Test Categoria',
            descripcion: 'Descripción categoría 1'
        });
    });

    afterEach(async () => {
        // Limpiar el categoria de prueba después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should update an existing categoria and return success response', async () => {
        const updateData = {
            nombre: 'Updated Categoria',
            descripcion: 'Descripción categoría actualizada 1'
        };

        const response = await request(app)
            .put(`/api/v1/categoria/${testCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.nombre).toBe(updateData.nombre);
        expect(response.body.data.descripcion).toBe(updateData.descripcion);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new categoria when ID does not exist', async () => {
        const newCategoriaData = {
            nombre: 'New Categoria',
            descripcion: '#NEWCOLOR'
        };

        const response = await request(app)
            .put('/api/v1/categoria/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newCategoriaData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.data.nombre).toBe(newCategoriaData.nombre);
        expect(response.body.data.descripcion).toBe(newCategoriaData.descripcion);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar el categoria creado
        await CategoriaModel.destroy({ where: { id: response.body.data.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            descripcion: ''
        };

        const response = await request(app)
            .put(`/api/v1/categoria/${testCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 