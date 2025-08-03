import request from 'supertest';
import { app } from '../../../src/index.js';
import { sequelize } from '../../../config/database.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';
import { MarcaModel } from '../../../src/models/MarcaModel.js';

describe('Integration Test: HardDeleteMarcaController', () => {
    let token;
    let testMarca;
    
    beforeAll(async () => {
        token = await TestAuthHelper.createUserAndLogin();
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

    it('should hard delete a marca and return success response', async () => {
        const response = await request(app)
            .delete(`/api/v1/marca/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBeTruthy();
        expect(response.body.mensaje).toBe('El registro ha sido eliminado exitosamente.');

        // Verificar que la marca fue eliminada completamente de la base de datos
        const deletedMarca = await MarcaModel.findByPk(testMarca.id, { paranoid: false });
        expect(deletedMarca).toBeNull();
    });

    it('should return 404 when marca does not exist', async () => {
        const response = await request(app)
            .delete('/api/v1/marca/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Regístro no encontrado');
    });
}); 