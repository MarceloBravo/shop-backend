import request from 'supertest';
import app from '../../appTest.js';
import { createTestRecords } from './constantes.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AccionesPantallaModel, PantallaModel } = db;


describe('Integration Test: SoftDeleteAccionesPantallaController', () => {
    let token;
    let recordTest;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un registro de prueba antes de cada test
        const record = await createTestRecords(PantallaModel, AccionesPantallaModel, 1);
        recordTest = record[0];
    });

    afterEach(async () => {
        // Limpiar el registro de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });
    

    it('should soft delete a record and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/acciones_pantalla/${recordTest.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verificar que el registro existe pero está marcado como eliminado
        const deletedRecord = await AccionesPantallaModel.findByPk(recordTest.id, { paranoid: false });
        expect(deletedRecord).toBeTruthy();
        expect(deletedRecord.deletedAt).toBeTruthy();
    });

    it('should return 404 when record does not exist', async () => {
        const response = await request(app)
            .patch('/api/v1/acciones_pantalla/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Registro no encontrado');
    });
}); 