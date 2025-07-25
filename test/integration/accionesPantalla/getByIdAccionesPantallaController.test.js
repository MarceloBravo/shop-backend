import request from 'supertest';
import { app } from '../../../src/index.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { PantallaModel } from '../../../src/models/PantallaModel.js';
import { AccionesPantallaModel } from '../../../src/models/AccionesPantallaModel.js';
import { createTestRecords, pantallaData, recordData } from './constantes.js';


describe('Integration Test: GetAccionesPantallaController', () => {
    let token;
    let pantalla;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un color de prueba antes de cada test
        const records = await createTestRecords(PantallaModel, AccionesPantallaModel, 2);
        pantalla = records[0];
    });

    afterEach(async () => {
        // Limpiar el color de prueba después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should get a record by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/acciones_pantalla/${pantalla.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('pantalla_id');
        expect(response.body).toHaveProperty('permite_crear');
        expect(response.body).toHaveProperty('deletedAt');
        expect(response.body.pantalla_id).toBe(pantalla.pantalla_id);
        expect(response.body.permite_crear).toBe(pantalla.permite_crear);
        expect(response.body.permite_eliminar).toBe(pantalla.permite_eliminar);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should return 404 when color does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/acciones_pantalla/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 

