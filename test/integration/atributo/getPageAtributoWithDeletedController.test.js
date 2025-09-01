import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { AtributosModel } = db;

describe('Integration Test: GetPageAtributoWithDeletedController', () => {
    let token;
    const dataAtributos = [
            { nombre: 'Atributo 1', valor_string: 'Kilogramos', valor_numerico: 1.3 },
            { nombre: 'Atributo 2', valor_string: 'Verano', valor_numerico: null },
            { nombre: 'Atributo 3', valor_string: 'Kilogramos', valor_numerico: 6 },
            { nombre: 'Atributo 4', valor_string: 'Otoño', valor_numerico: null },
            { nombre: 'Atributo 5', valor_string: null, valor_numerico: 3}
        ];
    const deleteData = [
        { nombre: 'Atributo 6', valor_string: null, valor_numerico: 2},
        { nombre: 'Atributo 7', valor_string: null, valor_numerico: 4},
    ];
    
    beforeAll(async () => {
        token = await createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos atributoes de prueba, incluyendo eliminados
        await AtributosModel.bulkCreate(dataAtributos);

        // Crear atributoes eliminados
        const deletedAtributos = await AtributosModel.bulkCreate(deleteData);

        // Eliminar lógicamente los atributoes
        for (const atributo of deletedAtributos) {
            await atributo.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todos los atributoes después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get a page of atributos including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/deleted/page/1/3')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('totReg');
        expect(response.body.data).toHaveProperty('rows');
        expect(response.body.data).toHaveProperty('pag');
        expect(response.body.data).toHaveProperty('totPag');
        
        expect(Array.isArray(response.body.data.data)).toBe(true);
        expect(response.body.data.rows).toBe(3);
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.totPag).toBeGreaterThan(0);
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(7); // 5 activos + 2 eliminados
    });

    it('should get second page of atributos including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no atributos exist', async () => {
        // Limpiar todos los atributoes
        await AtributosModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/atributo/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted atributos in the response', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye atributoes eliminados
        const hasDeletedAtributo = response.body.data.data.some(atributo => atributo.deletedAt);
        expect(hasDeletedAtributo).toBe(true);
    });
}); 