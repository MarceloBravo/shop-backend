import request from 'supertest';
import app from '../../appTest.js';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { MarcaModel } = db;

describe('Integration Test: SoftDeleteMarcaController', () => {
    let token;
    let testMarca;
    
    beforeAll(async () => {
        token = await createUserAndLogin();
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
    

    it('should soft delete a marca and return success response', async () => {
        const response = await request(app)
            .patch(`/api/v1/marca/${testMarca.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
            
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('mensaje');
        expect(response.body.code).toBeTruthy();
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verificar que la marca existe pero está marcada como eliminada
        const deletedMarca = await MarcaModel.findByPk(testMarca.id, { paranoid: false });
        expect(deletedMarca).toBeTruthy();
        expect(deletedMarca.deletedAt).toBeTruthy();
    });

    it('should return 404 when marca does not exist', async () => {
        const response = await request(app)
            .patch('/api/v1/marca/999999')
            .set('Authorization', `Bearer ${token}`)
            .expect(404);

        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toContain('Error: Registro no encontrado');
    });
}); 