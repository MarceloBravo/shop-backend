import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetPageColorWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunos colores de prueba, incluyendo eliminados
        await ColorModel.bulkCreate([
            { nombre: 'Active Color 1', valor: '#ACTIVE1' },
            { nombre: 'Active Color 2', valor: '#ACTIVE2' },
            { nombre: 'Active Color 3', valor: '#ACTIVE3' },
            { nombre: 'Active Color 4', valor: '#ACTIVE4' },
            { nombre: 'Active Color 5', valor: '#ACTIVE5' }
        ]);

        // Crear colores eliminados
        const deletedColors = await ColorModel.bulkCreate([
            { nombre: 'Deleted Color 1', valor: '#DELETED1' },
            { nombre: 'Deleted Color 2', valor: '#DELETED2' }
        ]);

        // Eliminar lógicamente los colores
        for (const color of deletedColors) {
            await color.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todos los colores después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get a page of colors including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/color/deleted/page/1/3')
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

    it('should get second page of colors including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/color/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(2);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/color/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no colors exist', async () => {
        // Limpiar todos los colores
        await ColorModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/color/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted colors in the response', async () => {
        const response = await request(app)
            .get('/api/v1/color/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye colores eliminados
        const hasDeletedColor = response.body.data.data.some(color => 
            color.nombre.includes('Deleted Color') && color.deletedAt
        );
        expect(hasDeletedColor).toBe(true);
    });
}); 