import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: GetPageCategoriaWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
        // Asegurarse de que la tabla de categorias esté limpia antes de que comiencen las pruebas en este archivo
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    beforeEach(async () => {
        // Crear algunos categoriaes de prueba, incluyendo eliminados
        await CategoriaModel.bulkCreate([
            { nombre: 'Active Categoria 1', descripcion: 'Descripción categoría 1' },
            { nombre: 'Active Categoria 2', descripcion: 'Descripción categoría 2' },
            { nombre: 'Active Categoria 3', descripcion: 'Descripción categoría 3' },
            { nombre: 'Active Categoria 4', descripcion: 'Descripción categoría 4' },
            { nombre: 'Active Categoria 5', descripcion: 'Descripción categoría 5' }
        ]);

        // Crear categoriaes eliminados
        const deletedCategorias = await CategoriaModel.bulkCreate([
            { nombre: 'Deleted Categoria 1', descripcion: 'Descripción categoría eliminada 1' },
            { nombre: 'Deleted Categoria 2', descripcion: 'Descripción categoría eliminada 2' }
        ]);

        // Eliminar lógicamente los categoriaes
        for (const categoria of deletedCategorias) {
            await categoria.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todos los categoriaes después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should get a page of categorias including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/deleted/page/1/3')
            .set('Authorization', `Bearer ${token}`)
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
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(7); // 5 activos + 2 eliminados
    });

    it('should get second page of categorias including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no categorias exist', async () => {
        // Limpiar todos los categoriaes
        await CategoriaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/categoria/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted categorias in the response', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye categoriaes eliminados
        const hasDeletedCategoria = response.body.data.data.some(categoria => 
            categoria.nombre.includes('Deleted Categoria') && categoria.deletedAt
        );
        expect(hasDeletedCategoria).toBe(true);
    });
}); 