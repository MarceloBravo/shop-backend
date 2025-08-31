import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetColorController', () => {
    let token;
    let testColor;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un color de prueba antes de cada test
        testColor = await ColorModel.create({
            nombre: 'Test Color',
            valor: '#TEST00'
        });
    });

    afterEach(async () => {
        // Limpiar el color de prueba después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get a color by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/color/${testColor.id}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(testColor.id);
        expect(response.body.nombre).toBe(testColor.nombre);
        expect(response.body.valor).toBe(testColor.valor);
    });

    it('should return 404 when color does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/color/999999')
            .expect(404);
            
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Color no encontrado');
    });
}); 

