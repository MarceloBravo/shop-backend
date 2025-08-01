import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';

describe('Integration Test: GetPageAtributoController', () => {
    let token;
    const dataAtributos = [
            { nombre: 'Atributo 1', valor_string: 'Kilogramos', valor_numerico: 1.3 },
            { nombre: 'Atributo 2', valor_string: 'Verano', valor_numerico: null },
            { nombre: 'Atributo 3', valor_string: 'Kilogramos', valor_numerico: 6 },
            { nombre: 'Atributo 4', valor_string: 'Otoño', valor_numerico: null },
            { nombre: 'Atributo 5', valor_string: null, valor_numerico: 3}
        ];
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos atributoes de prueba antes de cada test
        await AtributosModel.bulkCreate(dataAtributos);
    });

    afterEach(async () => {
        // Limpiar los atributoes de prueba después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get a page of atributos and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/page/1/3')
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
    });

    it('should get second page of atributos', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/page/2/2')
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/atributo/page/1')
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no atributos exist', async () => {
        // Limpiar todos los atributoes
        await AtributosModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/atributo/page/1/10')
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 