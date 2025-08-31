import request from 'supertest';
import app from '../../appTest.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { createTestRecords, pantallaData, recordData } from './constantes.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';


describe('Integration Test: GetAccionesPantallaWithDeletedController', () => {
    let token;
    let activeRecord;
    let deletedRecord;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un registro activo de prueba
        const records = await createTestRecords(PantallaModel, AccionesPantallaModel, 2);
        deletedRecord = records[0];
        activeRecord = records[1];
        // Eliminando registro de prueba
        await deletedRecord.destroy();
    });

    afterEach(async () => {
        // Limpiar los colores de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get an active record by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/acciones_pantalla/deleted/${activeRecord.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('pantalla_id');
        expect(response.body).toHaveProperty('permite_crear');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body.pantalla_id).toBe(activeRecord.pantalla_id);
        expect(response.body.permite_crear).toBe(activeRecord.permite_crear);
        expect(response.body.permite_eliminar).toBe(activeRecord.permite_eliminar);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted record by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/acciones_pantalla/deleted/${deletedRecord.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('pantalla_id');
            expect(response.body).toHaveProperty('permite_crear');
            expect(response.body).toHaveProperty('deletedAt');
            expect(response.body.pantalla_id).toBe(deletedRecord.pantalla_id);
            expect(response.body.permite_crear).toBe(deletedRecord.permite_crear);
            expect(response.body.permite_eliminar).toBe(deletedRecord.permite_eliminar);
            expect(response.body.deletedAt).not.toBeNull();
    });

    it('should return 404 when record does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 