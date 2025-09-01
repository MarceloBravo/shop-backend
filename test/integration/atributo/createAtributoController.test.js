import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AtributosModel } = db;


describe('Integration Test: CreateAtributoController', () => {
    let token;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    afterEach(async () => {
        // Limpiar todos los atributos después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should create a new atributo and return success response', async () => {
        const atributoData = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };

        const response = await request(app)
            .post('/api/v1/atributo') // Ajusta la ruta según tu configuración
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(atributoData)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.nombre).toBe(atributoData.nombre);
        expect(response.body.data.valor_string).toBe(atributoData.valor_string);
        expect(parseFloat( response.body.data.valor_numerico)).toBe(atributoData.valor_numerico);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return an error if data is invalid', async () => {
        const invalidData = {
            nombre: '', // Nombre vacío para provocar un error
            valor_string: null,
            valor_numerico: null
        };

        const response = await request(app)
            .post('/api/v1/atributo')
            .set('Authorization', `Bearer ${token}`) // Incluye el token en el encabezado
            .send(invalidData)
            .expect(400);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Datos no válidos');
    });
});
