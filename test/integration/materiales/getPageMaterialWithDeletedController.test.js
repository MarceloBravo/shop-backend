import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MaterialModel } = db;


describe('Integration Test: GetPageMaterialWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunas materials de prueba, incluyendo eliminadas
        await MaterialModel.bulkCreate([
            { valor: 'Lana' },
            { valor: 'Cuero' },
        ]);

        // Crear materials eliminadas
        const deletedMaterials = await MaterialModel.bulkCreate([
            { valor: 'Plástico' },
        ]);

        // Eliminar lógicamente las materials
        for (const material of deletedMaterials) {
            await material.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todas las materials después de cada test
        await MaterialModel.destroy({ where: {}, force: true });
    });

    it('should get a page of materials including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/deleted/page/1/3')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('pag');
        expect(response.body.data).toHaveProperty('totPag');
        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        expect(response.body.data.rows).toBe(3);
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.totPag).toBeGreaterThan(0);
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(3); // 2 activas + 1 eliminada
    });

    it('should get second page of materials including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(1);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no materials exist', async () => {
        // Limpiar todas las materials
        await MaterialModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/materiales/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted materials in the response', async () => {
        const response = await request(app)
            .get('/api/v1/materiales/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye materials eliminadas
        const hasDeletedMaterial = response.body.data.data.some(material => material.deletedAt );
        expect(hasDeletedMaterial).toBe(true);
    });
}); 