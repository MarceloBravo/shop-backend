import app from '../../appTest.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetByIdUsuarioController', () => {
    let testUsuario;
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

    it('should return usuario by id', async () => {
        const response = await request(app)
            .get(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id', testUsuario.id);
        expect(response.body.data).toHaveProperty('nombres', 'Test User');
        expect(response.body.data).toHaveProperty('email', 'test@example.com');
    });

    it('should return 404 for non-existent id', async () => {
        const response = await request(app)
            .get('/api/v1/usuario/999999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: El usuario no existe.');
    });

    it('should return 404 for soft deleted item', async () => {
        await UsuarioModel.destroy({
            where: { id: testUsuario.id }
        });

        const response = await request(app)
            .get(`/api/v1/usuario/${testUsuario.id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Error: El usuario no existe.');
    });
});
