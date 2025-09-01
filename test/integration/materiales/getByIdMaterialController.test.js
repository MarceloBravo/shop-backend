import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MaterialModel } = db;


describe('Integration Test: GetByIdMaterialController', () => {
    let token;
    let testMaterial;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear una material de prueba antes de cada test
        testMaterial = await MaterialModel.create({
            valor: 'Lana'
        });
    });

    afterEach(async () => {
        // Limpiar la material de prueba después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get a material by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/materiales/${testMaterial.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(testMaterial.id);
        expect(response.body.valor).toBe(testMaterial.valor);
    });

    it('should return 404 when material does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 