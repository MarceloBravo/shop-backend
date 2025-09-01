import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { GeneroModel } = db;


describe('Integration Test: CreateGeneroController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    afterEach(async () => {
        // Limpiar todos los generoes después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should create a new genero and return success response', async () => {
        const generoData = {
            genero: 'Masculino',
        };

        const response = await request(app)
            .post('/api/v1/genero') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(generoData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.genero).toBe(generoData.genero);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            genero: '', // Nombre vacío para provocar un error
        };

        const response = await request(app)
            .post('/api/v1/genero')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
