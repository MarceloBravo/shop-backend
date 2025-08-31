import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetByIdUsuarioWithDeletedController', () => {
    let testUsuario;
    let deletedUsuario;
    let token;

    beforeAll(async () => {
        token = global.testToken
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
                user_name: 'testuser1',
                password: 'password123',
                rol_id: 1
            });

            deletedUsuario = await UsuarioModel.create({
                rut: '22222222-2',
                nombres: 'Deleted User',
                apellido1: 'DeletedApellido1',
                apellido2: 'DeletedApellido2',
                direccion: '456 Deleted St',
                fono: '987654321',
                email: 'deleted@example.com',
                user_name: 'deleteduser',
                password: 'password123',
                rol_id: 1
            });

            // Soft delete one item
            await UsuarioModel.destroy({
                where: { id: deletedUsuario.id }
            });
        } catch (error) {
            console.error('Error setting up test data:', error);
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

    it('should return non-deleted usuario by id', async () => {
        const response = await request(app)
            .get(`/api/v1/usuario/deleted/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', testUsuario.id);
        expect(response.body).toHaveProperty('nombres', 'Test User');
        expect(response.body).toHaveProperty('email', 'test@example.com');
        expect(response.body.deleted_at).toBeNull();
    });

    it('should return deleted usuario by id', async () => {
        const response = await request(app)
            .get(`/api/v1/usuario/deleted/${deletedUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', deletedUsuario.id);
        expect(response.body).toHaveProperty('nombres', 'Deleted User');
        expect(response.body).toHaveProperty('email', 'deleted@example.com');
        expect(response.body.deleted_at).not.toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/deleted/999999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: El usuario no existe.');
    });
});