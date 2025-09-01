import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AtributosModel } = db;

describe('Integration Test: GetAtributoController', () => {
    let token;
    let testAtributo;
    const dataAtributo = { nombre: 'Unidades', valor_string: null, valor_numerico: 3 };
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un atributo de prueba antes de cada test
        testAtributo = await AtributosModel.create(dataAtributo);
    });

    afterEach(async () => {
        // Limpiar el atributo de prueba después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get a atributo by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/atributo/${testAtributo.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor_string');
        expect(response.body).toHaveProperty('valor_numerico');
        expect(response.body.id).toBe(testAtributo.id);
        expect(response.body.nombre).toBe(testAtributo.nombre);
        expect(response.body.valor_string).toBe(testAtributo.valor_string);
        expect(response.body.valor_numerico).toBe(testAtributo.valor_numerico);
    });

    it('should return 404 when atributo does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Atributo no encontrado');
    });
}); 

