import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { createTestRecords } from './constantes.js'
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';

describe('Integration Test: GetPageAccionesPantallaController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos registros de prueba antes de cada test
        await createTestRecords(PantallaModel, AccionesPantallaModel, 5);
    });

    afterEach(async () => {
        // Limpiar los registros de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a page of records and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/page/1/3')
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
    });

    it('should get second page of records', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no records exist', async () => {
        // Limpiar todos los colores
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/acciones_pantalla/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 