import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: SoftDeleteMaterialController', () => {
    let token;
    let testMaterial;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
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
    

    it('should soft delete a material and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/materiales/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBeTruthy();
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verificar que la material existe pero está materialda como eliminada
        const deletedMaterial = await MaterialModel.findByPk(testMaterial.id, { paranoid: false });
        expect(deletedMaterial).toBeTruthy();
        expect(deletedMaterial.deletedAt).toBeTruthy();
    });

    it('should return 404 when material does not exist', async () => {
        const response = await request(app)
            .patch('/api/v1/materiales/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 