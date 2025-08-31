import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { ColorModel } from '../../../src/models/ColorModel.js';

describe('Integration Test: SoftDeleteColorController', () => {
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
    

    it('should soft delete a color and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/color/${testColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verificar que el color existe pero está marcado como eliminado
        const deletedColor = await ColorModel.findByPk(testColor.id, { paranoid: false });
        expect(deletedColor).toBeTruthy();
        expect(deletedColor.deletedAt).toBeTruthy();
    });

    it('should return 404 when color does not exist', async () => {
        const response = await request(app)
            .patch('/api/v1/color/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Color no encontrado');
    });
}); 