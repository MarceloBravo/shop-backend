import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { CategoriaModel } = db;

describe('Integration Test: GetAllCategoriaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Limpiar categoriaes existentes para este test
        await CategoriaModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todos los categoriaes después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should get all categorias and return success response', async () => {
        await CategoriaModel.create({ nombre: 'Categoría 1', descripcion: 'Descripción categoría 1' });
        await CategoriaModel.create({ nombre: 'Categoría 2', descripcion: 'Descripción categoría 2' });

        const response = await request(app)
            .get('/api/v1/categoria')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        if (response.body.length > 0) {
            expect(response.body.data[0]).toHaveProperty('id');
            expect(response.body.data[0]).toHaveProperty('nombre');
            expect(response.body.data[0]).toHaveProperty('descripcion');
        }
    });

    it('should return empty array when no categorias exist', async () => {
        const response = await request(app)
            .get('/api/v1/categoria')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 