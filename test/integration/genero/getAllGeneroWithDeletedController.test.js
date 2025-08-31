import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetAllGeneroWithDeletedController', () => {
    let token;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear algunos generoes de prueba, incluyendo uno eliminado
        await GeneroModel.bulkCreate([
            { genero: 'Masculino' },
            { genero: 'Femenino' },
        ]);

        // Crear un genero y luego eliminarlo lógicamente
        const deletedGenero = await GeneroModel.create({
            genero:  'Masculino',
        });
        await deletedGenero.destroy();
    });

    afterEach(async () => {
        // Limpiar todos los generoes después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get all generos including deleted ones and return success response', async () => {

        const response = await request(app)
            .get('/api/v1/genero/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            const data = response.body.data;
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeGreaterThanOrEqual(3); // 2 activos + 1 eliminado
            
            // Verificar que incluye generoes eliminados
            const hasDeletedGenero = data.some(genero => genero.deletedAt );
        expect(hasDeletedGenero).toBe(true);
    });

    it('should return empty array when no generos exist', async () => {
        // Limpiar todos los generoes
        await GeneroModel.destroy({ where: {}, force: true });

        const response = await request(app)
            .get('/api/v1/genero/deleted')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(0);
    });
}); 