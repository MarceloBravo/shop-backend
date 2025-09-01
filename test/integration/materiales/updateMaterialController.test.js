import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MaterialModel } = db;


describe('Integration Test: UpdateMaterialController', () => {
    let token;
    let testMaterial;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear una material de prueba antes de cada test
        testMaterial = await MaterialModel.create({
            valor: 'Lana'
        });
    });

    afterEach(async () => {
        // Limpiar la material de prueba después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should update an existing material and return success response', async () => {
        const updateData = {
            valor: 'Lana Updated'
        };

        const response = await request(app)
            .put(`/api/v1/materiales/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateData)
            .expect(200);
            
        expect(response.body).toHaveProperty('material');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.material.nombre).toBe(updateData.nombre);
        expect(response.body.material.logo).toBe(updateData.logo);
        expect(response.body.mensaje).toBe('Registro actualizado exitosamente.');
    });

    it('should create a new material when ID does not exist', async () => {
        const newMaterialData = {
            valor: 'Cuero'
        };

        const response = await request(app)
            .put('/api/v1/materiales/999999')
            .set('Authorization', `Bearer ${token}`)
            .send(newMaterialData)
            .expect(200);

        expect(response.body).toHaveProperty('material');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.material.nombre).toBe(newMaterialData.nombre);
        expect(response.body.material.logo).toBe(newMaterialData.logo);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');

        // Limpiar la material creada
        await MaterialModel.destroy({ where: { id: response.body.material.id }, force: true });
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            valor: '' // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .put(`/api/v1/materiales/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });

    it('should return an error if material name already exists', async () => {
        // Crear otra material con nombre diferente
        await MaterialModel.create({
            valor: 'Cuero'
        });

        const duplicateData = {
            valor: 'Cuero' // Mismo nombre para provocar error
        };

        const response = await request(app)
            .put(`/api/v1/materiales/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(duplicateData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Ya existe un registro con el valor ingresado.');
    });
}); 