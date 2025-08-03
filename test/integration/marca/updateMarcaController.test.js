import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: UpdateMarcaController', () => {
    let token;
    let testMarca;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear una marca de prueba antes de cada test
        testMarca = await MarcaModel.create({
            nombre: 'Nike',
            logo: 'path/to/nike.png'
        });
    });

    afterEach(async () => {
        // Limpiar la marca de prueba después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should update an existing marca and return success response', async () => {
        const updateData = {
            nombre: 'Nike Updated',
            logo: 'path/to/updated-nike.png'
        };

        const response = await request(app)
            .put(`/api/v1/marca/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
            
        expect(response.body).toHaveProperty('marca');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.marca.nombre).toBe(updateData.nombre);
        expect(response.body.marca.logo).toBe(updateData.logo);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new marca when ID does not exist', async () => {
        const newMarcaData = {
            nombre: 'Adidas',
            logo: 'path/to/adidas.png'
        };

        const response = await request(app)
            .put('/api/v1/marca/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newMarcaData)
            .expect(200);

        expect(response.body).toHaveProperty('marca');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.marca.nombre).toBe(newMarcaData.nombre);
        expect(response.body.marca.logo).toBe(newMarcaData.logo);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar la marca creada
        await MarcaModel.destroy({ where: { id: response.body.marca.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            logo: 'path/to/logo.png'
        };

        const response = await request(app)
            .put(`/api/v1/marca/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });

    it('should return an error if marca name already exists', async () => {
        // Crear otra marca con nombre diferente
        await MarcaModel.create({
            nombre: 'Adidas',
            logo: 'path/to/adidas.png'
        });

        const duplicateData = {
            nombre: 'Adidas', // Mismo nombre para provocar error
            logo: 'path/to/another-logo.png'
        };

        const response = await request(app)
            .put(`/api/v1/marca/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(duplicateData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Ya existe una marca con ese nombre');
    });
}); 