import { app } from '../../../src/index.js';
import request from 'supertest';
import { sequelize } from '../../../config/database.js';
import { UsuarioModel } from '../../../src/models/UsuarioModel.js';
import { TestAuthHelper } from '../helpers/TestAuthHelper.js';

describe('GetAllUsuarioController', () => {
    let token;

    beforeAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        token = await TestAuthHelper.createUserAndLogin();
        
        try {
            // Create test data
            await UsuarioModel.bulkCreate([
                {
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
                },
                {
                    rut: '22222222-2',
                    nombres: 'Test User 2',
                    apellido1: 'Apellido1b',
                    apellido2: 'Apellido2b', 
                    direccion: '123 Test St 1',
                    fono: '1234567891',
                    email: 'test1@example.com',
                    user_name: 'testuser1',
                    password: 'password123',
                    rol_id: 1
                },
                {
                    rut: '33333333-3',
                    nombres: 'Test User 2',
                    apellido1: 'Apellido1c',
                    apellido2: 'Apellido2c', 
                    direccion: '123 Test St 2',
                    fono: '1234567892',
                    email: 'test2@example.com',
                    user_name: 'testuser2',
                    password: 'password123',
                    rol_id: 1
                }
            ]);
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
        await sequelize.close();
    });
    
    it('should return all usuarios', async () => {
        const response = await request(app)
            .get('/api/v1/usuario')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
        
        const firstItem = response.body.data[0];
        expect(firstItem).toHaveProperty('id');
        expect(firstItem).toHaveProperty('nombres');
        expect(firstItem).toHaveProperty('email');
    });

    it('should not return soft deleted items', async () => {
        // Soft delete one item
        await UsuarioModel.destroy({
            where: { email: 'user1@example.com' }
        });

        const response = await request(app)
            .get('/api/v1/usuario')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.data.find(item => item.email === 'user1@example.com')).toBeUndefined();
    });
});
