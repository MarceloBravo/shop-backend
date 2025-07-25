import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetPageColorController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos colores de prueba antes de cada test
        await ColorModel.bulkCreate([
            { nombre: 'Color 1', valor: '#COLOR1' },
            { nombre: 'Color 2', valor: '#COLOR2' },
            { nombre: 'Color 3', valor: '#COLOR3' },
            { nombre: 'Color 4', valor: '#COLOR4' },
            { nombre: 'Color 5', valor: '#COLOR5' }
        ]);
    });

    afterEach(async () => {
        // Limpiar los colores de prueba después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get a page of colors and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/color/page/1/3')
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

    it('should get second page of colors', async () => {
        const response = await request(app)
            .get('/api/v1/color/page/2/2')
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/color/page/1')
            .expect(200);
            
        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no colors exist', async () => {
        // Limpiar todos los colores
        await ColorModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/color/page/1/10')
            .expect(200);
            
        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });
}); 