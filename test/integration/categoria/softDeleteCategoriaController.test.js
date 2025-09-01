import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { CategoriaModel } = db;

describe('Integration Test: SoftDeleteCategoriaController', () => {
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
    

    it('should soft delete a categoria and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/categoria/${testCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verificar que el categoria existe pero está marcado como eliminado
        const deletedCategoria = await CategoriaModel.findByPk(testCategoria.id, { paranoid: false });
        expect(deletedCategoria).toBeTruthy();
        expect(deletedCategoria.deletedAt).toBeTruthy();
    });

    it('should return 404 when categoria does not exist', async () => {
        const response = await request(app)
            .patch('/api/v1/categoria/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Categoría no encontrada');
    });
}); 