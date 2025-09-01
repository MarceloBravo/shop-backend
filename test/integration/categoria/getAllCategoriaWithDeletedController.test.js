import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { CategoriaModel } = db;

describe('Integration Test: GetAllCategoriaWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        await CategoriaModel.destroy({ where: {}, force: true });
        // Crear algunos categoriaes de prueba, incluyendo uno eliminado
        await CategoriaModel.bulkCreate([
            { nombre: 'Categoría 1', descripcion: 'Descripción categoría 1' },
            { nombre: 'Categoría 2', descripcion: 'Descripción categoría 2' }
        ]);

        // Crear un categoria y luego eliminarlo lógicamente
        const deletedCategoria = await CategoriaModel.create({
            nombre: 'Deleted Categoria',
            descripcion: 'Descripción categoría 1'
        });
        await deletedCategoria.destroy();
    });

    afterEach(async () => {
        // Limpiar todos los categoriaes después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should get all categorias including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/categoria/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activos + 1 eliminado
            
            // Verificar que incluye categoriaes eliminados
            const hasDeletedCategoria = data.some(categoria => 
                categoria.nombre === 'Deleted Categoria' && categoria.deletedAt
            );
        expect(hasDeletedCategoria).toBe(true);
    });

    it('should return empty array when no categorias exist', async () => {
        // Limpiar todos los categoriaes
        await CategoriaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/categoria/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 