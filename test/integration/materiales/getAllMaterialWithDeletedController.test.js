import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MaterialModel } from '../../../src/models/MaterialModel.js';

describe('Integration Test: GetAllMaterialWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunas materials de prueba, incluyendo una eliminada
        await MaterialModel.bulkCreate([
            { valor: 'Lana' },
            { valor: 'Cuero' },
        ]);

        // Crear una material y luego eliminarla lógicamente
        const deletedMaterial = await MaterialModel.create({
            valor: 'Plastico'
        });
        await deletedMaterial.destroy();
    });

    afterEach(async () => {
        // Limpiar todas las materials después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get all materials including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/materiales/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activas + 1 eliminada
            
            // Verificar que incluye materials eliminadas
            const hasDeletedMaterial = data.some(material => material.deletedAt );
        expect(hasDeletedMaterial).toBe(true);
    });

    it('should return empty array when no materials exist', async () => {
        // Limpiar todas las materials
        await MaterialModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/materiales/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 