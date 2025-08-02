import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: UpdateGeneroController', () => {
    let token;
    let testGenero;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un genero de prueba antes de cada test
        testGenero = await GeneroModel.create({
            genero: 'Masculino',
        });
    });

    afterEach(async () => {
        // Limpiar el genero de prueba después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should update an existing genero and return success response', async () => {
        const updateData = {
            genero: 'Unisex',
        };

        const response = await request(app)
            .put(`/api/v1/genero/${testGenero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
            
        expect(response.body).toHaveProperty('genero');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.genero.genero).toBe(updateData.genero);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new genero when ID does not exist', async () => {
        const newGeneroData = {
            genero: 'Masculino',
        };

        const response = await request(app)
            .put('/api/v1/genero/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newGeneroData)
            .expect(200);

        expect(response.body).toHaveProperty('genero');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.genero.genero).toBe(newGeneroData.genero);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar el genero creado
        await GeneroModel.destroy({ where: { id: response.body.genero.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            genero: '', // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .put(`/api/v1/genero/${testGenero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
}); 