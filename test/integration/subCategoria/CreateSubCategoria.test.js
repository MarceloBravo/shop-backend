import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { SubCategoriaModel } from '../../../src/models/SubCategoriaModel.js';
import rutas from '../../../src/routes/rutas.js'; // Import rutas

describe('CreateSubCategoriaController Integration', () => {
    let token;
    let createdSubCategoriaId;

    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        // Manually apply routes to the app instance for testing
        const API_PREFIX = '/api/v1';
        rutas.forEach(({ path, router }) => {
            app.use(`${API_PREFIX}${path}`, router);
        });
    });

    afterEach(async () => {
        if (createdSubCategoriaId) {
            await SubCategoriaModel.destroy({ where: { id: createdSubCategoriaId }, force: true });
            createdSubCategoriaId = null;
        }
    });

    test('should create a new subcategoria', async () => {
        const subCategoriaData = {
            nombre: 'Test Create SubCategoria',
            categoria_id: 1
        };

        const response = await request(app)
            .post('/api/v1/sub_categoria')
            .set('Authorization', `Bearer ${token}`)
            .send(subCategoriaData);
            
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(subCategoriaData.nombre);
        createdSubCategoriaId = response.body.data.id;
    });

    test('should return 400 with invalid data', async () => {
        const invalidSubCategoriaData = {
            nombre: ''
        };

        const response = await request(app)
            .post('/api/v1/sub_categoria')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidSubCategoriaData);
            
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Error: Datos no válidos:');
        expect(response.body.details).toStrictEqual([
                    "El nombre ingresado no es válido, ingresa un nombre de hasta 100 carácteres.", 
                    "La categoria ingresada no es váida o no existe, ingresa una categoría válida."
                ]);
        
    });
});