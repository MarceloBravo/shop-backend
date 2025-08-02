import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetPageGeneroWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear algunos generoes de prueba, incluyendo eliminados
        await GeneroModel.bulkCreate([
            { genero: 'Masculino' },
            { genero: 'Femenino' },
        ]);

        // Crear generoes eliminados
        const deletedGeneros = await GeneroModel.bulkCreate([
            { genero: 'Unisex' },
        ]);

        // Eliminar lógicamente los generoes
        for (const genero of deletedGeneros) {
            await genero.destroy();
        }
    });

    afterEach(async () => {
        // Limpiar todos los generoes después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get a page of generos including deleted ones and return success response', async () => {
        const response = await request(app)
            .get('/api/v1/genero/deleted/page/1/3')
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
        expect(response.body.data.totReg).toBeGreaterThanOrEqual(3); // 5 activos + 2 eliminados
    });

    it('should get second page of generos including deleted ones', async () => {
        const response = await request(app)
            .get('/api/v1/genero/deleted/page/2/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(2);
        expect(response.body.data.rows).toBe(1);
    });

    it('should use default values when pagination parameters are not provided', async () => {
        const response = await request(app)
            .get('/api/v1/genero/deleted/page/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.pag).toBe(1);
        expect(response.body.data.rows).toBeGreaterThan(0);
    });

    it('should return empty page when no generos exist', async () => {
        // Limpiar todos los generoes
        await GeneroModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/genero/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.data.data).toHaveLength(0);
        expect(response.body.data.totReg).toBe(0);
        expect(response.body.data.rows).toBe(0);
    });

    it('should include deleted generos in the response', async () => {
        const response = await request(app)
            .get('/api/v1/genero/deleted/page/1/10')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verificar que incluye generoes eliminados
        const hasDeletedGenero = response.body.data.data.some(genero => genero.deletedAt );
        expect(hasDeletedGenero).toBe(true);
    });
}); 