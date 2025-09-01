
import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { SubCategoriaModel, CategoriaModel } = db;


describe('UpdateSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaId;
    let categoria;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
    });

    afterEach(async () => {
        if (createdSubCategoriaId) {
            await SubCategoriaModel.destroy({ where: {}, force: true });
            createdSubCategoriaId = null;
        }
    });

    test('should update an existing subcategory', async () => {
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Update Original', categoria_id: categoria.id });
        createdSubCategoriaId = subCategoria.id;

        const updatedData = {
            nombre: 'Test Update New Name',
            categoria_id: categoria.id
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
            categoria_id: categoria.id
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
        const subCategoria = await SubCategoriaModel.create({ nombre: 'Test Update Invalid', categoria_id: categoria.id });
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
