import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { createTestRecords } from './constantes.js';

describe('Integration Test: HardDeleteAccionesPantallaController', () => {
    let token;
    let recordTest;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un record de prueba antes de cada test
        const record = await createTestRecords(PantallaModel, AccionesPantallaModel, 1);
        recordTest = record[0];
    });

    afterEach(async () => {
        // Limpiar el registro de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should hard delete a record and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/acciones_pantalla/${recordTest.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(parseInt(response.body.id)).toBe(recordTest.id);

        // Verificar que el registro fue eliminado completamente de la base de datos
        const deletedRecord = await AccionesPantallaModel.findByPk(recordTest.id, { paranoid: false });
        expect(deletedRecord).toBeNull();
    });

    it('should return 404 when record does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/acciones_pantalla/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Registro no encontrado');
    });
}); 