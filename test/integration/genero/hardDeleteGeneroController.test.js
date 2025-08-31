import request from 'supertest';
import app from '../../appTest.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { GeneroModel } from '../../../src/models/GeneroModel.js';

describe('Integration Test: HardDeleteGeneroController', () => {
    let token;
    let testGenero;
    
    beforeAll(async () => {
        token = global.testToken
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

    it('should hard delete a genero and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/genero/${testGenero.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('id');
        expect(parseInt(response.body.id)).toBe(testGenero.id);

        // Verificar que el genero fue eliminado completamente de la base de datos
        const deletedGenero = await GeneroModel.findByPk(testGenero.id, { paranoid: false });
        expect(deletedGenero).toBeNull();
    });

    it('should return 404 when genero does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/genero/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Género no encontrado');
    });
}); 