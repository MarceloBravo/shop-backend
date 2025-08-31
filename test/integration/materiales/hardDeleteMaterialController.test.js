import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: HardDeleteMaterialController', () => {
    let token;
    let testMaterial;
    
    beforeAll(async () => {
        token = global.testToken
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

    it('should hard delete a material and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/materiales/${testMaterial.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBeTruthy();
        expect(response.body.mensaje).toBe('El registro ha sido eliminado exitosamente.');

        // Verificar que la material fue eliminada completamente de la base de datos
        const deletedMaterial = await MaterialModel.findByPk(testMaterial.id, { paranoid: false });
        expect(deletedMaterial).toBeNull();
    });

    it('should return 404 when material does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/materiales/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 