import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetPageGeneroController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunos generoes de prueba antes de cada test
        await GeneroModel.bulkCreate([
            { genero: 'Masculino' },
            { genero: 'Femenino' },
            { genero: 'Unisex' },
        ]);
    });

    afterEach(async () => {
        // Limpiar los generoes de prueba después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get a page of generos and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/genero/page/1/3')
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

    it('should get second page of generos', async () => {
        const response = await request(app)
            .get('/api/v1/genero/page/2/2')
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(1);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/genero/page/1')
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no generos exist', async () => {
        // Limpiar todos los generoes
        await GeneroModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/genero/page/1/10')
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 