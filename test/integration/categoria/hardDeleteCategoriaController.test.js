import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { CategoriaModel } = db;

describe('Integration Test: HardDeleteCategoriaController', () => {
    let token;
    let testCategoria;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
        await CategoriaModel.destroy({ where: {}, force: true });
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

    it('should hard delete a categoria and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/categoria/${testCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(parseInt(response.body.id)).toBe(testCategoria.id);

        // Verificar que el categoria fue eliminado completamente de la base de datos
        const deletedCategoria = await CategoriaModel.findByPk(testCategoria.id, { paranoid: false });
        expect(deletedCategoria).toBeNull();
    });

    it('should return 404 when categoria does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/categoria/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Categoría no encontrada');
    });
}); 