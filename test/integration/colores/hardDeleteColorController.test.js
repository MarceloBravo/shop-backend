import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { ColorModel } = db;

describe('Integration Test: HardDeleteColorController', () => {
    let token;
    let testColor;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
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

    it('should hard delete a color and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/color/${testColor.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(parseInt(response.body.id)).toBe(testColor.id);

        // Verificar que el color fue eliminado completamente de la base de datos
        const deletedColor = await ColorModel.findByPk(testColor.id, { paranoid: false });
        expect(deletedColor).toBeNull();
    });

    it('should return 404 when color does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/color/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Color no encontrado');
    });
}); 