import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { createTestRecords } from './constantes.js';

describe('Integration Test: GetPageAccionesPantallaWithDeletedController', () => {
    let token;
    let deleted = [];
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos registros de prueba, incluyendo eliminados
        const records = await createTestRecords(PantallaModel, AccionesPantallaModel, 7);
        deleted.push(records[0]);
        deleted.push(records[1]);
        // Eliminar lógicamente los registros
        for (const reg of deleted) {
            await reg.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todos los registros después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a page of records including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/page/1/3')
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
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(7); // 5 activos + 2 eliminados
    });

    it('should get second page of records including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no registros exist', async () => {
        // Limpiar todos los registros
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted records in the response', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye registros eliminados
        const hasDeleted = response.body.data.data.some(reg => 
             reg.deletedAt
        );
        expect(hasDeleted).toBe(true);
    });
}); 