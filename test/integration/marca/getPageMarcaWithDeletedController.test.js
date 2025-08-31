import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: GetPageMarcaWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunas marcas de prueba, incluyendo eliminadas
        await MarcaModel.bulkCreate([
            { nombre: 'Nike', logo: 'path/to/nike.png' },
            { nombre: 'Adidas', logo: 'path/to/adidas.png' },
        ]);

        // Crear marcas eliminadas
        const deletedMarcas = await MarcaModel.bulkCreate([
            { nombre: 'Puma', logo: 'path/to/puma.png' },
        ]);

        // Eliminar lógicamente las marcas
        for (const marca of deletedMarcas) {
            await marca.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todas las marcas después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should get a page of marcas including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/marca/deleted/page/1/3')
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
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(3); // 2 activas + 1 eliminada
    });

    it('should get second page of marcas including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/marca/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(1);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/marca/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no marcas exist', async () => {
        // Limpiar todas las marcas
        await MarcaModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/marca/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted marcas in the response', async () => {
        const response = await request(app)
            .get('/api/v1/marca/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye marcas eliminadas
        const hasDeletedMarca = response.body.data.data.some(marca => marca.deletedAt );
        expect(hasDeletedMarca).toBe(true);
    });
}); 