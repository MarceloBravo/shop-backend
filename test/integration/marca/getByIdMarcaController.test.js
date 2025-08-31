import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: GetByIdMarcaController', () => {
    let token;
    let testMarca;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear una marca de prueba antes de cada test
        testMarca = await MarcaModel.create({
            nombre: 'Nike',
            logo: 'path/to/nike.png'
        });
    });

    afterEach(async () => {
        // Limpiar la marca de prueba después de cada test
        await MarcaModel.destroy({ where: {}, force: true });
    });

    it('should get a marca by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/marca/${testMarca.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('logo');
        expect(response.body.id).toBe(testMarca.id);
        expect(response.body.nombre).toBe(testMarca.nombre);
        expect(response.body.logo).toBe(testMarca.logo);
    });

    it('should return 404 when marca does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/marca/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Marca no encontrada');
    });
}); 