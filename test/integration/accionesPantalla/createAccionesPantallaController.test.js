import request from 'supertest';
import app from '../../appTest.js';
import { createTestRecords } from './constantes.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AccionesPantallaModel, PantallaModel } = db;


describe('Integration Test: CreateAccionesPantallaController', () => {
    let token;
    let pantalla;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        const record = await createTestRecords(PantallaModel, AccionesPantallaModel, 5);
        pantalla = record[0];
    });

    afterEach(async () => {
        // Limpiar todos los registros después de cada test
        await AccionesPantallaModel.destroy({ where: {}, force: true });
        await PantallaModel.destroy({ where: {}, force: true });
    });

    it('should create a new record and return success response', async () => {
        const data = {
            pantalla_id: pantalla.pantalla_id,
            permite_crear: true,
            permite_actualizar: false,
            permite_eliminar: false,
            permite_ver: false,
            permite_listar: true
        };

        const response = await request(app)
            .post('/api/v1/acciones_pantalla') 
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(data)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.pantalla_id).toBe(pantalla.pantalla_id);
        expect(response.body.data.permite_crear).toBe(data.permite_crear);
        expect(response.body.data.permite_eliminar).toBe(data.permite_eliminar);
        expect(response.body.data.permite_listar).toBe(data.permite_listar);
        expect(response.body.data.permite_actualizar).toBe(data.permite_actualizar);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            pantalla_id: null,  //pantall_id no es válido
            permite_crear: true,
            permite_actualizar: false,
            permite_eliminar: false,
            permite_listar: true
        };

        const response = await request(app)
            .post('/api/v1/acciones_pantalla')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
