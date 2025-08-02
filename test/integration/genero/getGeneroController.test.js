import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: GetGeneroController', () => {
    let token;
    let testGenero;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
    });

    beforeEach(async () => {
        // Crear un genero de prueba antes de cada test
        testGenero = await GeneroModel.create({
            genero: 'Masculino',
        });
    });

    afterEach(async () => {
        // Limpiar el genero de prueba después de cada test
        await GeneroModel.destroy({ where: {}, force: true });
    });

    it('should get a genero by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/genero/${testGenero.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('genero');
        expect(response.body.id).toBe(testGenero.id);
        expect(response.body.genero).toBe(testGenero.genero);
    });

    it('should return 404 when genero does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/genero/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Regístro no encontrado');
    });
}); 

