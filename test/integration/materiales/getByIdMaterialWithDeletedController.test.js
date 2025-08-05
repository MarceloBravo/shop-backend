import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: GetByIdMaterialWithDeletedController', () => {
    let token;
    let testMaterial;
    let deletedMaterial;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear una material activa de prueba
        testMaterial = await MaterialModel.create({
            valor: 'Lana'
        });

        // Crear una material eliminada de prueba
        deletedMaterial = await MaterialModel.create({
            valor: 'Cuero'
        });
        await deletedMaterial.destroy();
    });

    afterEach(async () => {
        // Limpiar las materials de prueba después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get an active material by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/materiales/deleted/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(testMaterial.id);
        expect(response.body.valor).toBe(testMaterial.valor);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted material by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/materiales/deleted/${deletedMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(deletedMaterial.id);
        expect(response.body.valor).toBe(deletedMaterial.valor);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when material does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 