import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { createTestRecords } from './constantes.js';

describe('Integration Test: GetAllColorController', () => {
    let token;
    let recordTest;    
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Limpiar colores existentes para este test
        const record = await createTestRecords(PantallaModel, AccionesPantallaModel, 5);
        recordTest = record[0];
    })

    afterEach(async () => {
        // Limpiar todos los registros después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get all records and return success response', async () => {
        //pantalla = await PantallaModel.create(pantallaData);

        const response = await request(app)
            .get('/api/v1/acciones_pantalla')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBeGreaterThan(1);
        expect(response.body.data[0].pantalla_id).toBe(recordTest.pantalla_id);
        expect(response.body.data[0].permite_crear).toBe(recordTest.permite_crear);
        expect(response.body.data[0].permite_eliminar).toBe(recordTest.permite_eliminar);
        expect(response.body.data[0].permite_listar).toBe(recordTest.permite_listar);
        expect(response.body.data[0].permite_actualizar).toBe(recordTest.permite_actualizar);
    });

    it('should return empty array when no records exist', async () => {
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
        
        const response = await request(app)
            .get('/api/v1/acciones_pantalla')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .expect(200);
        
        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 