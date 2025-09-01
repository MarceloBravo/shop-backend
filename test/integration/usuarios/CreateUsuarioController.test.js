import app from '../../appTest.js';
import request from 'supertest';
import db from '../../../src/models/index.js';
import { createUserAndLogin } from '../helpers/TestAuthHelper.js';
const { UsuarioModel } = db;

describe('CreateUsuarioController', () => {
    let token;

    beforeAll(async () => {
        token = await createUserAndLogin();
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
    });

    afterAll(async () => {
        await UsuarioModel.destroy({ 
            where: {}, 
            force: true 
        }); // Clear existing records
        //await sequelize.close();
    });

    it('should create a new usuario', async () => {
        const userData = {
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
        };

        const response = await request(app)
            .post('/api/v1/usuario')
            .set('Authorization', `Bearer ${token}`)
            .send(userData);
              
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('nombres', userData.nombres);
        expect(response.body.data).toHaveProperty('email', userData.email);
        expect(response.body.mensaje).toBe('El registro ha sido creado exitosamente.');
    });

    it('should return error when required fields are missing', async () => {
        const response = await request(app)
            .post('/api/v1/usuario')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body).toHaveProperty('details');
    });

    it('should return error for duplicate email', async () => {
        const userData = {
            nombres: 'Another User',
            email: 'test@example.com', // Same email as first test
            password: 'password123',
            id_rol: 1
        };

        const response = await request(app)
            .post('/api/v1/usuario')
            .set('Authorization', `Bearer ${token}`)
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should not create user without authentication', async () => {
        const userData = {
            rut: '22222222-2',
            nombres: 'Test User',
            apellido1: 'Apellido1b',
            apellido2: 'Apellido2b', 
            direccion: '123 Test St',
            fono: '123456789',
            email: 'test2@example.com',
            user_name: 'testuser',
            password: 'password123',
            rol_id: 1
        };

        const response = await request(app)
            .post('/api/v1/usuario')
            .send(userData);
            
        expect(response.status).toBe(403);
    });
});
