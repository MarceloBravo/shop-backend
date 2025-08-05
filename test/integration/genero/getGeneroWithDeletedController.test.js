import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetGeneroWithDeletedController', () => {
    let token;
    let testGenero;
    let deletedGenero;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un genero activo de prueba
        testGenero = await GeneroModel.create({
            genero: 'Masculino',
        });

        // Crear un genero eliminado de prueba
        deletedGenero = await GeneroModel.create({
            genero: 'Unisex',
        });
        await deletedGenero.destroy();
    });

    afterEach(async () => {
        // Limpiar los generoes de prueba después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get an active genero by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/genero/deleted/${testGenero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('genero');
        expect(response.body.id).toBe(testGenero.id);
        expect(response.body.genero).toBe(testGenero.genero);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted genero by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/genero/deleted/${deletedGenero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('genero');
        expect(response.body.id).toBe(deletedGenero.id);
        expect(response.body.genero).toBe(deletedGenero.genero);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when genero does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/genero/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 