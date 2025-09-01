import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { UsuarioModel } = db;

describe('SoftDeleteUsuarioController', () => {
    let testUsuario;
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        
        try {
            // Create test data
            testUsuario = await UsuarioModel.create({
                rut: '11111111-1',
                nombres: 'Test User',
                apellido1: 'Apellido1',
                apellido2: 'Apellido2', 
                direccion: '123 Test St',
                fono: '123456789',
                email: 'test@example.com',
                user_name: 'testuser',
                password: 'password123',
                rol_id: 1
            });
        } catch (error) {
            console.error('Error creating test data:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        //await sequelize.close();
    });

    it('should soft delete usuario', async () => {
        const response = await request(app)
            .patch(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe('El registro ha sido borrado exitosamente.');

        // Verify the record is soft deleted
        const deleted = await UsuarioModel.findByPk(testUsuario.id, { paranoid: false });
        expect(deleted.deleted_at).not.toBeNull();
        
        // Verify the record is not returned in normal queries
        const notFound = await UsuarioModel.findByPk(testUsuario.id);
        expect(notFound).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .patch('/api/v1/usuario/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it('should not allow soft delete without authentication', async () => {
        const response = await request(app)
            .patch(`/api/v1/usuario/${testUsuario.id}`);

        expect(response.status).toBe(403);
    });

    it('should return 404 for already deleted item', async () => {
        const response = await request(app)
            .patch(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
    });
});
