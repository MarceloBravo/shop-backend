
import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';

describe('UpdateSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaId;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    afterEach(async () => {
        if (createdSubCategoriaId) {
            await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaId }, force: true });
            createdSubCategoriaId = null;
        }
    });

    test('should update an existing subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Update Original', categoria_id: 1 });
        createdSubCategoriaId = subCategoria.id;

        const updatedData = {
            nombre: 'Test Update New Name',
            categoria_id: 1
        };

        const response = await request(app)
            .put(`/api/v1/sub_categoria/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(response.body.subcategoria.nombre).toBe(updatedData.nombre);
    });

    test('should create a subcategory if id does not exist', async () => {
        const nonExistentId = 99999;
        const newData = {
            nombre: 'Test Update Create New',
            categoria_id: 1
        };

        const response = await request(app)
            .put(`/api/v1/sub_categoria/${nonExistentId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newData);

        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje).toBe('Registro creado exitosamente.');
        expect(response.body.subcategoria.nombre).toBe(newData.nombre);
        createdSubCategoriaId = response.body.subcategoria.id; // Store for cleanup
    });

    test('should return 400 with invalid data during update', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Update Invalid', categoria_id: 1 });
        createdSubCategoriaId = subCategoria.id;

        const invalidData = {
            nombre: ''
        };

        const response = await request(app)
            .put(`/api/v1/sub_categoria/${createdSubCategoriaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(invalidData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('details');
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details).toStrictEqual([
                    "El nombre ingresado no es válido, ingresa un nombre de hasta 100 carácteres.", 
                    "La categoria ingresada no es váida o no existe, ingresa una categoría válida."
                ]);
    });
});
