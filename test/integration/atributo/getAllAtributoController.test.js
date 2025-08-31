import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { AtributosModel } from '../../../src/models/AtributosModel.js';

describe('Integration Test: GetAllAtributoController', () => {
    let token;
    const dataAtributos = [
            { nombre: 'Peso', valor_string: 'Kilogramos', valor_numerico: 1.3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { nombre: 'Temporada', valor_string: 'Verano', valor_numerico: null, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null },
            { nombre: 'Unidades', valor_string: null, valor_numerico: 3, createdAt: '2023-01-01', updatedAt: '2023-01-02', deletedAt: null }
        ];
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Limpiar atributoes existentes para este test
        await AtributosModel.destroy({ where: {}, force: true });
    })

    afterEach(async () => {
        // Limpiar todos los atributoes después de cada test
        await AtributosModel.destroy({ where: {}, force: true });
    });

    it('should get all atributos and return success response', async () => {
        await AtributosModel.create(dataAtributos[0]);
        await AtributosModel.create(dataAtributos[1]);
        await AtributosModel.create(dataAtributos[2]);

        const response = await request(app)
            .get('/api/v1/atributo')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(3);
        
        expect(response.body.data[0]).toHaveProperty('id');
        expect(response.body.data[0]).toHaveProperty('nombre');
        expect(response.body.data[0]).toHaveProperty('valor_string');
        expect(response.body.data[0]).toHaveProperty('valor_numerico');
    });

    it('should return empty array when no atributos exist', async () => {
        const response = await request(app)
            .get('/api/v1/atributo')
            .expect(200);
            
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 