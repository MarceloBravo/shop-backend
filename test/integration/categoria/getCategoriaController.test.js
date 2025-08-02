import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: GetCategoriaController', () => {
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

    it('should get a categoria by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/categoria/${testCategoria.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('descripcion');
        expect(response.body.id).toBe(testCategoria.id);
        expect(response.body.nombre).toBe(testCategoria.nombre);
        expect(response.body.descripcion).toBe(testCategoria.descripcion);
    });

    it('should return 404 when categoria does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Categoría no encontrada');
    });
}); 

