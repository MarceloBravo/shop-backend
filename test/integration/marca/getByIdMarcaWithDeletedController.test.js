import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: GetByIdMarcaWithDeletedController', () => {
    let token;
    let testMarca;
    let deletedMarca;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear una marca activa de prueba
        testMarca = await MarcaModel.create({
            nombre: 'Nike',
            logo: 'path/to/nike.png'
        });

        // Crear una marca eliminada de prueba
        deletedMarca = await MarcaModel.create({
            nombre: 'Adidas',
            logo: 'path/to/adidas.png'
        });
        await deletedMarca.destroy();
    });

    afterEach(async () => {
        // Limpiar las marcas de prueba después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should get an active marca by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/marca/deleted/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('logo');
        expect(response.body.id).toBe(testMarca.id);
        expect(response.body.nombre).toBe(testMarca.nombre);
        expect(response.body.logo).toBe(testMarca.logo);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted marca by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/marca/deleted/${deletedMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('logo');
        expect(response.body.id).toBe(deletedMarca.id);
        expect(response.body.nombre).toBe(deletedMarca.nombre);
        expect(response.body.logo).toBe(deletedMarca.logo);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when marca does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/marca/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Marca no encontrada');
    });
}); 