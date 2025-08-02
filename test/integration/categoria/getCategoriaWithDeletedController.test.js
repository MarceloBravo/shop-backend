import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { CategoriaModel } from '../../../src/models/CategoriaModel.js';

describe('Integration Test: GetCategoriaWithDeletedController', () => {
    let token;
    let testCategoria;
    let deletedCategoria;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un categoria activo de prueba
        testCategoria = await CategoriaModel.create({
            nombre: 'Test Categoria',
            descripcion: 'Descripción categoría 1'
        });

        // Crear un categoria eliminado de prueba
        deletedCategoria = await CategoriaModel.create({
            nombre: 'Deleted Categoria',
            descripcion: 'Descripción categoría 1'
        });
        await deletedCategoria.destroy();
    });

    afterEach(async () => {
        // Limpiar los categoriaes de prueba después de cada test
        await CategoriaModel.destroy({ where: {}, force: true });
    });

    it('should get an active categoria by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/categoria/deleted/${testCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('descripcion');
        expect(response.body.id).toBe(testCategoria.id);
        expect(response.body.nombre).toBe(testCategoria.nombre);
        expect(response.body.descripcion).toBe(testCategoria.descripcion);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted categoria by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/categoria/deleted/${deletedCategoria.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('descripcion');
        expect(response.body.id).toBe(deletedCategoria.id);
        expect(response.body.nombre).toBe(deletedCategoria.nombre);
        expect(response.body.descripcion).toBe(deletedCategoria.descripcion);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when categoria does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/categoria/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Categoría no encontrada');
    });
}); 