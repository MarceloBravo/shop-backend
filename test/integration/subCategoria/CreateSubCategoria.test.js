import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { SubCategoriaModel, CategoriaModel } = db;

describe('CreateSubCategoriaController Integration', () => {
    let token;
    let categoria;


    beforeAll(async () => {
        token = await createUserAndLogin();;
        await CategoriaModel.destroy({ where: {}, force: true });
        await SubCategoriaModel.destroy({ where: {}, force: true });
        categoria = await CategoriaModel.create({ nombre: 'Test Categoria', descripcion: 'Test Categoria' });
        /*
        // Manually apply routes to the app instance for testing
        const API_PREFIX = '/api/v1';
        rutas.forEach(({ path, router }) => {
            app.use(`${API_PREFIX}${path}`, router);
        });
        */
    });

    afterEach(async () => {
        await SubCategoriaModel.destroy({ where: {}, force: true });
    });

    test('should create a new subcategoria', async () => {
        const subCategoriaData = {
            nombre: 'Test Create SubCategoria',
            categoria_id: categoria.id
        };

        const response = await request(app)
            .post('/api/v1/sub_categoria')
            .set('Authorization', `Bearer ${token}`)
            .send(subCategoriaData);
            
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(subCategoriaData.nombre);
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