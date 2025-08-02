import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: GetPageCategoriaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos categoriaes de prueba antes de cada test
        await CategoriaModel.bulkCreate([
            { nombre: 'Categoria 1', descripcion: 'Descripción categoría 1' },
            { nombre: 'Categoria 2', descripcion: 'Descripción categoría 2' },
            { nombre: 'Categoria 3', descripcion: 'Descripción categoría 3' },
            { nombre: 'Categoria 4', descripcion: 'Descripción categoría 4' },
            { nombre: 'Categoria 5', descripcion: 'Descripción categoría 5' }
        ]);
    });

    afterEach(async () => {
        // Limpiar los categoriaes de prueba después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should get a page of categorias and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/page/1/3')
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('pag');
        expect(response.body.data).toHaveProperty('totPag');
        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        expect(response.body.data.rows).toBe(3);
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.totPag).toBeGreaterThan(0);
    });

    it('should get second page of categorias', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/page/2/2')
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/page/1')
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no categorias exist', async () => {
        // Limpiar todos los categoriaes
        await CategoriaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/categoria/page/1/10')
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 