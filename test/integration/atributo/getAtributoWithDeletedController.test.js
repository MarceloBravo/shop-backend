import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AtributosModel } = db;


describe('Integration Test: GetAtributoWithDeletedController', () => {
    let token;
    let testAtributo;
    let deletedAtributo;
    const deleteData = { nombre: 'Unidades', valor_string: null, valor_numerico: 3};
    const dataAtributo = { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3 };
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un atributo activo de prueba
        testAtributo = await AtributosModel.create(dataAtributo);

        // Crear un atributo eliminado de prueba
        deletedAtributo = await AtributosModel.create(deleteData);
        await deletedAtributo.destroy();
    });

    afterEach(async () => {
        // Limpiar los atributoes de prueba después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get an active atributo by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/atributo/deleted/${testAtributo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor_string');
        expect(response.body).toHaveProperty('valor_numerico');
        expect(response.body.id).toBe(testAtributo.id);
        expect(response.body.nombre).toBe(testAtributo.nombre);
        expect(response.body.valor_string).toBe(testAtributo.valor_string);
        expect(response.body.valor_numerico).toBe(testAtributo.valor_numerico);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted atributo by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/atributo/deleted/${deletedAtributo.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor_string');
        expect(response.body).toHaveProperty('valor_numerico');
        expect(response.body.id).toBe(deletedAtributo.id);
        expect(response.body.nombre).toBe(deletedAtributo.nombre);
        expect(response.body.valor_string).toBe(deletedAtributo.valor_string);
        expect(response.body.valor_numerico).toBe(deletedAtributo.valor_numerico);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when atributo does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Atributo no encontrado');
    });
}); 