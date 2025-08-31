import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: GetColorWithDeletedController', () => {
    let token;
    let testColor;
    let deletedColor;
    
    beforeAll(async () => {
        token = global.testToken
    });

    beforeEach(async () => {
        // Crear un color activo de prueba
        testColor = await ColorModel.create({
            nombre: 'Test Color',
            valor: '#TEST00'
        });

        // Crear un color eliminado de prueba
        deletedColor = await ColorModel.create({
            nombre: 'Deleted Color',
            valor: '#DELETED'
        });
        await deletedColor.destroy();
    });

    afterEach(async () => {
        // Limpiar los colores de prueba después de cada test
        await ColorModel.destroy({ where: {}, force: true });
    });

    it('should get an active color by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/color/deleted/${testColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(testColor.id);
        expect(response.body.nombre).toBe(testColor.nombre);
        expect(response.body.valor).toBe(testColor.valor);
        expect(response.body.deletedAt).toBeNull();
    });

    it('should get a deleted color by ID and return success response', async () => {
        const response = await request(app)
            .get(`/api/v1/color/deleted/${deletedColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('nombre');
        expect(response.body).toHaveProperty('valor');
        expect(response.body.id).toBe(deletedColor.id);
        expect(response.body.nombre).toBe(deletedColor.nombre);
        expect(response.body.valor).toBe(deletedColor.valor);
        expect(response.body.deletedAt).toBeTruthy();
    });

    it('should return 404 when color does not exist', async () => {
        const response = await request(app)
            .get('/api/v1/color/deleted/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Color no encontrado');
    });
}); 