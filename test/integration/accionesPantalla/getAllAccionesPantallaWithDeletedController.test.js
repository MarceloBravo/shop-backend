import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { recordData, createTestRecords } from './constantes.js';

describe('Integration Test: GetAllAccionesPantallaWithDeletedController', () => {
    let token;
    let deletedRecord;
    //const deletedData = recordData;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos registros de prueba, incluyendo uno eliminado
        const records = await createTestRecords(PantallaModel, AccionesPantallaModel, 3);
        deletedRecord = records[0];
        //Elimina lógicamente
        await deletedRecord.destroy();
        
    });

    afterEach(async () => {
        // Limpiar todos los registros asociados a los test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get all records including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(response.body).toHaveProperty('count');
            expect(response.body.count).toBeGreaterThan(1);
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activos + 1 eliminado
            
            // Verificar que incluye registros eliminados
            const hasDeleted = data.some(record => 
                record.id === deletedRecord.id && record.deletedAt
            );
        expect(hasDeleted).toBe(true);
    });

    it('should return empty array when no data exist', async () => {
        // Limpiar todos los registros
        await AccionesPantallaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/acciones_pantalla/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('count');
        expect(response.body.count).toBe(0);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 